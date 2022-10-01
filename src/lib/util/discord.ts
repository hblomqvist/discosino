import { DiscosinoColor, DiscosinoEmoji } from "#config";
import type { ActivityType } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ZERO_WIDTH_SPACE } from "./constants";

export function failureEmbed(message: string) {
	return new MessageEmbed() //
		.setColor(DiscosinoColor.Failure)
		.setDescription(`${DiscosinoEmoji.Failure} ${message}`);
}

export function successEmbed(message: string) {
	return new MessageEmbed() //
		.setColor(DiscosinoColor.Success)
		.setDescription(`${DiscosinoEmoji.Success} ${message}`);
}

export function codeBlock(code: string, language = ""): string {
	if (!code || /^\n*$/.test(code)) return codeBlock(ZERO_WIDTH_SPACE);

	const escaped = code.replaceAll("`", `\`${ZERO_WIDTH_SPACE}`);

	return `\`\`\`${language}\n${escaped}\n\`\`\``;
}

export interface MemberIdentifier {
	guildId: string;
	userId: string;
}

export type BotActivityType = Exclude<ActivityType, "CUSTOM">;
