import { DiscosinoColor, DiscosinoEmoji } from '#config';
import type { ActivityType } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { ZWS } from './text';

export function createEmbed(type: EmbedType, description?: string): MessageEmbed {
	const [color, emoji] =
		type === 'Default' ? [DiscosinoColor.Primary, ''] : [DiscosinoColor[type], `${DiscosinoEmoji[type]} `];

	return new MessageEmbed() //
		.setColor(color)
		.setDescription(emoji + (description ?? ''));
}

export function codeBlock(code: string, language = ''): string {
	if (!code || /^\n*$/.test(code)) return codeBlock(ZWS);

	const escaped = code.replaceAll('`', `\`${ZWS}`);

	return `\`\`\`${language}\n${escaped}\n\`\`\``;
}

export interface MemberIdentifier {
	guildId: string;
	userId: string;
}

export type BotActivityType = Exclude<ActivityType, 'CUSTOM'>;

type EmbedType = 'Default' | 'Failure' | 'Success';
