import { DiscosinoColor } from '#config';
import {
	ChatOutputHandler,
	ConsoleOutputHandler,
	EvalOutput,
	EvalOutputHandler,
	EvalPayload,
	EvalResult,
	FileOutputHandler,
	PastebinOutputHandler
} from '#lib/eval';
import { ZERO_WIDTH_SPACE } from '#util/constants';
import { createEmbed } from '#util/discord';
import { Duration, humanizeDuration } from '#util/duration';
import type { NodeError } from '#util/misc';
import { sanitize } from '#util/sanitizer';
import { HandlerChain } from '#util/structures';
import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { Type } from '@sapphire/type';
import { isThenable } from '@sapphire/utilities';
import {
	Message,
	MessageActionRow,
	MessageEmbed,
	Modal,
	ModalActionRowComponent,
	ModalSubmitInteraction,
	TextInputComponent
} from 'discord.js';
import { format } from 'prettier';
import { setTimeout as sleep } from 'timers/promises';
import { inspect } from 'util';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Evaluate JavaScript code. Can only be used by developers.',
	preconditions: ['DeveloperOnly']
})
export class UserCommand extends Command {
	private readonly defaultOptions: EvalOptions = {
		depth: 0,
		showHidden: false,
		wrapAsync: false,
		timeout: Duration.Minute,
		outputTo: 'chat',
		ephemeral: true
	};

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.setDefaultMemberPermissions('0')
					.addIntegerOption((option) =>
						option //
							.setName('depth')
							.setDescription(
								`The number of times to recurse while formatting an object. Default: ${this.defaultOptions.depth}`
							)
							.setMinValue(-1)
					)
					.addBooleanOption((option) =>
						option //
							.setName('show_hidden')
							.setDescription(`Show non-enumerable object properties. Default: ${this.defaultOptions.showHidden}`)
					)
					.addBooleanOption((option) =>
						option //
							.setName('wrap_async')
							.setDescription(`Wrap the code in an async arrow function. Default: ${this.defaultOptions.wrapAsync}`)
					)
					.addIntegerOption((option) =>
						option //
							.setName('timeout')
							.setDescription(`How long to wait for a result in milliseconds. Default: ${this.defaultOptions.timeout}`)
							.setMinValue(-1)
					)
					.addStringOption((option) =>
						option //
							.setName('output_to')
							.setDescription(`How the result should be outputted. Default: ${this.defaultOptions.outputTo}`)
							.setChoices(
								{ name: 'Chat', value: 'chat' },
								{ name: 'Pastebin', value: 'pastebin' },
								{ name: 'File', value: 'file' },
								{ name: 'Console', value: 'console' }
							)
					)
					.addBooleanOption((option) =>
						option //
							.setName('ephemeral')
							.setDescription(`Hide the response from everyone except you. Default: ${this.defaultOptions.ephemeral}`)
					),
			{ idHints: ['1000113999590990046', '1000212138960363600'] }
		);
	}

	public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
		const modalCustomId = `eval-modal-${interaction.id}`;

		const modal = new Modal() //
			.setCustomId(modalCustomId)
			.setTitle('Eval')
			.setComponents(
				new MessageActionRow<ModalActionRowComponent>().addComponents(
					new TextInputComponent() //
						.setCustomId('codeInput')
						.setLabel('Code')
						.setStyle('PARAGRAPH')
						.setRequired(true)
				)
			);

		await interaction.showModal(modal);

		let modalInteraction: ModalSubmitInteraction;

		try {
			modalInteraction = await interaction.awaitModalSubmit({
				filter: (interaction) => interaction.customId === modalCustomId,
				time: 30 * Duration.Minute
			});
		} catch (error) {
			if ((error as NodeError).code !== 'INTERACTION_COLLECTOR_ERROR') throw error;
			const embed = createEmbed('Failure', 'The session has expired, please try again.');

			return interaction.followUp({ ephemeral: true, embeds: [embed] });
		}

		const options = this.getOptions(interaction);

		return this.modalSubmitRun(modalInteraction, options);
	}

	private getOptions(interaction: ChatInputCommand.Interaction) {
		const options: EvalOptions = {
			depth: interaction.options.getInteger('depth') ?? this.defaultOptions.depth,
			showHidden: interaction.options.getBoolean('show_hidden') ?? this.defaultOptions.showHidden,
			wrapAsync: interaction.options.getBoolean('wrap_async') ?? this.defaultOptions.wrapAsync,
			timeout: interaction.options.getInteger('timeout') ?? this.defaultOptions.timeout,
			outputTo: interaction.options.getString('output_to') ?? this.defaultOptions.outputTo,
			ephemeral: interaction.options.getBoolean('ephemeral') ?? this.defaultOptions.ephemeral
		};

		if (options.depth <= -1) options.depth = Infinity;
		if (options.timeout <= -1) options.timeout = 10 * Duration.Minute;

		return options;
	}

	private async modalSubmitRun(interaction: ModalSubmitInteraction, options: EvalOptions) {
		const message = (await interaction.deferReply({
			ephemeral: options.ephemeral,
			fetchReply: true
		})) as Message;

		const modalInput = interaction.fields.getTextInputValue('codeInput');
		const code = options.wrapAsync ? `(async () => {\n${modalInput}\n})();` : modalInput;

		const payload: EvalPayload = {
			prettyInput: this.formatCode(code),
			result: await this.timeoutEval(code, options, { interaction, message })
		};

		const outputHandler = this.buildOutputChain(options.outputTo);
		const { content, files } = await outputHandler.handle(payload);
		const embed = this.buildEmbed(content, payload);

		return interaction.editReply({ embeds: [embed], files });
	}

	private timeoutEval(code: string, options: EvalOptions, util: EvalUtil): Promise<EvalResult> {
		const humanizedDuration = humanizeDuration(options.timeout, { style: 'long', maxDecimals: 2 });

		return Promise.race<EvalResult>([
			sleep(options.timeout).then(() => ({
				success: false,
				isError: true,
				output: `EvalTimeoutError: Evaluation took longer than ${humanizedDuration}.`,
				type: 'EvalTimeoutError',
				time: options.timeout
			})),
			this.eval(code, options, util)
		]);
	}

	private async eval(code: string, { depth, showHidden }: EvalOptions, util: EvalUtil): Promise<EvalResult> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { interaction, message } = util;

		let success = true;
		let isError = false;
		let result: unknown;
		let type: Type;

		const timer = new Stopwatch().reset();

		try {
			timer.start();
			// eslint-disable-next-line no-eval
			result = eval(code);
			timer.stop();

			type = new Type(result);

			if (isThenable(result)) {
				timer.start();
				result = await result;
				timer.stop();
			}
		} catch (error) {
			timer.stop();
			success = false;
			result = error;
		}

		type ??= new Type(result);

		if (typeof result === 'string') {
			result = `'${result}'`;
		} else if (result instanceof Error) {
			isError = true;
			result = result.stack;
		} else {
			result = inspect(result, { depth, showHidden });
		}

		return {
			success,
			isError,
			output: sanitize(result as string) || ZERO_WIDTH_SPACE,
			type: type.toString() || ZERO_WIDTH_SPACE,
			time: timer.duration
		};
	}

	private formatCode(code: string) {
		try {
			const prettyCode = format(code, {
				parser: 'babel',
				singleQuote: true,
				trailingComma: 'none',
				semi: true
			}).replace(/\n$/, '');

			return prettyCode || code;
		} catch {
			return code;
		}
	}

	private buildOutputChain(outputTo: string) {
		const outputs: Record<string, EvalOutputHandler> = {
			chat: new ChatOutputHandler(),
			pastebin: new PastebinOutputHandler(),
			file: new FileOutputHandler(),
			console: new ConsoleOutputHandler()
		};

		const outputSet = new Set([outputs[outputTo], outputs.chat, outputs.pastebin, outputs.file, outputs.console]);

		return new HandlerChain<EvalPayload, EvalOutput>(outputSet);
	}

	private buildEmbed(content: string, { result }: EvalPayload) {
		const humanizedDuration = humanizeDuration(result.time, { style: 'compact', maxDecimals: 2 });

		return new MessageEmbed() //
			.setColor(result.success ? DiscosinoColor.Primary : DiscosinoColor.Failure)
			.setDescription(content)
			.setFooter({ text: `⏱️ ${humanizedDuration}` });
	}
}

interface EvalOptions {
	depth: number;
	showHidden: boolean;
	wrapAsync: boolean;
	timeout: number;
	outputTo: string;
	ephemeral: boolean;
}

interface EvalUtil {
	interaction: ModalSubmitInteraction;
	message: Message;
}
