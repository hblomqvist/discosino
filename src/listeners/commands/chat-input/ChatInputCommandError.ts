import { ErrorIdentifier, getErrorMessage } from '#core/errors';
import { createEmbed } from '#util/discord';
import { Prisma } from '@prisma/client';
import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommandErrorPayload, Events, Listener, UserError } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

@ApplyOptions<Listener.Options>({
	event: Events.ChatInputCommandError
})
export class UserListener extends Listener<typeof Events.ChatInputCommandError> {
	public override async onLoad() {
		await this.store.get('CoreChatInputCommandError')!.unload();

		return super.onLoad();
	}

	public override run(error: Error, { interaction, command }: ChatInputCommandErrorPayload) {
		if (error instanceof UserError) return this.sendError(interaction, error);

		const { name, location } = command;
		this.container.logger.error(`Encountered error on chat input command "${name}" at path "${location.full}"`, error);

		return this.sendError(interaction, new UserError({ identifier: this.getIdentifier(error) }));
	}

	private getIdentifier(error: Error): ErrorIdentifier {
		if (error instanceof Prisma.PrismaClientInitializationError) return ErrorIdentifier.NoDatabaseConnection;
		return ErrorIdentifier.Unexpected;
	}

	private async sendError(interaction: CommandInteraction, error: UserError) {
		const embed = createEmbed('Failure', getErrorMessage(error));
		const payload = { embeds: [embed], ephemeral: true };

		if (interaction.deferred || interaction.replied) return interaction.followUp(payload);

		return interaction.reply(payload);
	}
}
