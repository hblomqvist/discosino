import { DiscosinoColor, DiscosinoEmoji } from "#lib/constants";
import { formatFunds, getBalance } from "#lib/economy";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";

@ApplyOptions<ChatInputCommand.Options>({
	description: "Displays account balance.",
	preconditions: ["GuildOnly"]
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.setDMPermission(false)
					.addUserOption((option) =>
						option //
							.setName("user")
							.setDescription("The user whose balance shall be displayed.")
					),
			{ idHints: ["1000113997363810365", "1000212137655947346"] }
		);
	}

	public override async chatInputRun(interaction: ChatInputCommand.Interaction) {
		await interaction.deferReply();

		const user = interaction.options.getUser("user") ?? interaction.user;

		const { moneyAmount, tokenAmount } = await getBalance({
			userId: user.id,
			guildId: interaction.guild!.id
		});

		const totalAmount = moneyAmount + tokenAmount;

		const embed = new MessageEmbed() //
			.setColor(DiscosinoColor.Primary)
			.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
			.addFields([
				{ name: "Money", value: `${DiscosinoEmoji.MoneySymbol} ${formatFunds(moneyAmount)}` },
				{ name: "Tokens", value: `${DiscosinoEmoji.TokenSymbol} ${formatFunds(tokenAmount)}` },
				{ name: "Net Worth", value: `${DiscosinoEmoji.MixedSymbol} ${formatFunds(totalAmount)}` }
			]);

		return interaction.editReply({ embeds: [embed] });
	}
}
