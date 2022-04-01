import { DiscosinoColor, DiscosinoEmoji } from "#lib/constants";
import { MessageEmbed } from "discord.js";

export function failureEmbed(message: string) {
	return new MessageEmbed() //
		.setColor(DiscosinoColor.Failure)
		.setDescription(`${DiscosinoEmoji.Failure} ${message}`);
}
