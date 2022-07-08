import { DiscosinoColor, DiscosinoEmoji } from "#lib/constants";
import { getBalance } from "#lib/economy";
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
					.addUserOption((option) =>
						option //
							.setName("user")
							.setDescription("The user whose balance shall be displayed.")
					),
			{ idHints: ["994784896490938490"] }
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
			.addField("Money", this.formatCurrency(DiscosinoEmoji.MoneySymbol, moneyAmount))
			.addField("Tokens", this.formatCurrency(DiscosinoEmoji.TokenSymbol, tokenAmount))
			.addField("Net Worth", this.formatCurrency(DiscosinoEmoji.MixedSymbol, totalAmount))
			.setFooter({ text: user.tag, iconURL: user.displayAvatarURL() });

		return interaction.editReply({ embeds: [embed] });
	}

	private formatCurrency(symbol: string, amount: bigint) {
		return `${symbol} ${amount.toLocaleString("en-US")}`;
	}
}
