import { DiscosinoColor, DiscosinoEmoji } from "#config";
import type { ActivityType } from "discord.js";
import { MessageEmbed } from "discord.js";
import { ZERO_WIDTH_SPACE } from "./constants";

export function createEmbed(type: EmbedType, description?: string): MessageEmbed {
	const [color, emoji] =
		type === "Default" ? [DiscosinoColor.Primary, ""] : [DiscosinoColor[type], `${DiscosinoEmoji[type]} `];

	return new MessageEmbed() //
		.setColor(color)
		.setDescription(emoji + description ?? "");
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

type EmbedType = "Default" | "Failure" | "Success";
