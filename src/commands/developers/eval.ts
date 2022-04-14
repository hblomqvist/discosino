import { COMMAND_GUILD_IDS } from "#config";
import { DiscosinoColor, ZERO_WIDTH_SPACE } from "#lib/constants";
import {
	ChatOutputHandler,
	ConsoleOutputHandler,
	EvalOutput,
	EvalOutputHandler,
	EvalPayload,
	FileOutputHandler,
	PastebinOutputHandler
} from "#lib/eval";
import { sanitize } from "#util/sanitizer";
import { HandlerChain } from "#util/structures";
import { formatDurationShort } from "#util/time";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { Stopwatch } from "@sapphire/stopwatch";
import { Type } from "@sapphire/type";
import { isThenable } from "@sapphire/utilities";
import { Message, MessageEmbed } from "discord.js";
import { setTimeout as sleep } from "timers/promises";
import { inspect } from "util";

@ApplyOptions<ChatInputCommand.Options>({
	description: "Evaluates JavaScript code. Can only be used by developers.",
	preconditions: ["DeveloperOnly"]
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.setDefaultPermission(false)
					.addStringOption((option) =>
						option //
							.setName("code")
							.setDescription("The expression, statement, or sequence of statements to be evaluated.")
							.setRequired(true)
					)
					.addIntegerOption((option) =>
						option //
							.setName("depth")
							.setDescription("The number of times to recurse while formatting an object. Default: 0")
					)
					.addBooleanOption((option) =>
						option //
							.setName("show_hidden")
							.setDescription("Shows non-enumerable object properties. Default: False")
					)
					.addBooleanOption((option) =>
						option //
							.setName("async")
							.setDescription("Wraps the code in an async arrow function. Default: False")
					)
					.addIntegerOption((option) =>
						option //
							.setName("timeout")
							.setDescription("How long to wait for a result in milliseconds. Default: 60000")
					)
					.addStringOption((option) =>
						option //
							.setName("output_to")
							.setDescription("Where the result should be outputted. Default: Chat")
							.setChoices([
								["Chat", "chat"],
								["Pastebin", "pastebin"],
								["File", "file"],
								["Console", "console"]
							])
					)
					.addBooleanOption((option) =>
						option //
							.setName("ephemeral")
							.setDescription("Hides the response from everyone except you. Default: True")
					),
			{
				guildIds: COMMAND_GUILD_IDS,
				idHints: ["936007780874199040"]
			}
		);
	}

	public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
		const options = this.getOptions(interaction);

		const message = (await interaction.deferReply({
			ephemeral: options.ephemeral,
			fetchReply: true
		})) as Message;

		const payload = await this.timeoutEval(options, { interaction, message });
		const outputHandler = this.buildOutputChain(options.outputTo);
		const { content, files } = await outputHandler.handle(payload);

		const embed = new MessageEmbed() //
			.setColor(payload.success ? DiscosinoColor.Primary : DiscosinoColor.Failure)
			.setDescription(content)
			.setFooter({ text: `⏱️ ${formatDurationShort(payload.time)}` });

		return interaction.editReply({ embeds: [embed], files });
	}

	private getOptions(interaction: ChatInputCommand.Interaction) {
		const options: EvalOptions = {
			code: interaction.options.getString("code", true),
			depth: interaction.options.getInteger("depth") ?? 0,
			showHidden: interaction.options.getBoolean("show_hidden") ?? false,
			async: interaction.options.getBoolean("async") ?? false,
			timeout: interaction.options.getInteger("timeout") ?? 60000,
			outputTo: interaction.options.getString("output_to") ?? "chat",
			ephemeral: interaction.options.getBoolean("ephemeral") ?? true
		};

		if (options.async) options.code = `(async () => {\n${options.code}\n})();`;
		if (options.depth <= -1) options.depth = Infinity;
		if (options.timeout <= 0) options.timeout = 900000;

		return options;
	}

	private timeoutEval(options: EvalOptions, util: EvalUtil) {
		return Promise.race<EvalPayload>([
			sleep(options.timeout).then(() => ({
				success: false,
				input: options.code,
				output: `EvalTimeoutError: Evaluation took longer than ${formatDurationShort(options.timeout)}.`,
				type: "EvalTimeoutError",
				time: options.timeout
			})),
			this.eval(options, util)
		]);
	}

	private async eval({ code, depth, showHidden }: EvalOptions, util: EvalUtil): Promise<EvalPayload> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { interaction, message } = util;

		let success = true;
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
			type = new Type(error);
		}

		if (typeof result !== "string") {
			result = result instanceof Error ? result.stack : inspect(result, { depth, showHidden });
		}

		return {
			success,
			input: code,
			output: sanitize(result as string) || ZERO_WIDTH_SPACE,
			type: type.toString(),
			time: timer.duration
		};
	}

	private buildOutputChain(outputTo: string) {
		const outputs: Record<string, EvalOutputHandler> = {
			chat: new ChatOutputHandler(),
			pastebin: new PastebinOutputHandler(),
			file: new FileOutputHandler(),
			console: new ConsoleOutputHandler()
		};

		const outputSet = new Set<EvalOutputHandler>();

		outputSet //
			.add(outputs[outputTo])
			.add(outputs.chat)
			.add(outputs.pastebin)
			.add(outputs.file)
			.add(outputs.console);

		return new HandlerChain<EvalPayload, EvalOutput>(...outputSet);
	}
}

interface EvalOptions {
	code: string;
	depth: number;
	showHidden: boolean;
	async: boolean;
	timeout: number;
	outputTo: string;
	ephemeral: boolean;
}

interface EvalUtil {
	interaction: ChatInputCommand.Interaction;
	message: Message;
}
