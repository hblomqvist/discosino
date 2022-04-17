import { COMMAND_GUILD_IDS } from "#config";
import { DiscosinoColor } from "#lib/constants";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<ChatInputCommand.Options>({
	description: "Measures bot latency."
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description),
			{
				guildIds: COMMAND_GUILD_IDS,
				idHints: ["965065317254574110"]
			}
		);
	}

	public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
		const message = (await interaction.deferReply({
			ephemeral: true,
			fetchReply: true
		})) as Message;

		const rtt = message.createdTimestamp - interaction.createdTimestamp;
		const { ping } = this.container.client.ws;

		const embed = new MessageEmbed() //
			.setColor(DiscosinoColor.Primary)
			.addField("Round Trip", `\`⏱️ ${rtt} ms\``)
			.addField("Client", `\`⏱️ ${ping} ms\``);

		return interaction.editReply({ embeds: [embed] });
	}
}
