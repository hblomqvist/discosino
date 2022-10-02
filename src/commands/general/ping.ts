import { createEmbed } from '#util/discord';
import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Measures bot latency.'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description),
			{ idHints: ['1000113998609530980', '1000212136871604245'] }
		);
	}

	public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
		const message = (await interaction.deferReply({
			ephemeral: true,
			fetchReply: true
		})) as Message;

		const messageDiff = message.createdTimestamp - interaction.createdTimestamp;
		const { ping } = this.container.client.ws;

		const embed = createEmbed('Default') //
			.addFields([
				{ name: 'Round Trip', value: this.formatPing(messageDiff) },
				{ name: 'Heartbeat', value: this.formatPing(ping) }
			]);

		return interaction.editReply({ embeds: [embed] });
	}

	private formatPing(ms: number) {
		return `\`⏱️ ${ms} ms\``;
	}
}
