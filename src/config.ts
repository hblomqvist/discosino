import { ENV } from '#lib/env';
import type { BotActivityType } from '#util/discord';
import { LogLevel } from '@sapphire/framework';
import { ClientOptions, Intents } from 'discord.js';

export const CLIENT_OPTIONS: ClientOptions = {
	intents: [Intents.FLAGS.GUILDS],
	logger: {
		level: ENV.isProd ? LogLevel.Info : LogLevel.Debug
	},
	partials: ['CHANNEL'],
	presence: {
		activities: [
			{
				name: ENV.ACTIVITY_NAME,
				type: ENV.ACTIVITY_TYPE as BotActivityType
			}
		]
	}
};

export const SANITIZER_SUFFIXES = ['DATABASE_URL', 'TOKEN'];
export const VERSION = process.env.npm_package_version ?? '0.0.0';

export enum DiscosinoColor {
	Primary = 0x5865f2,
	Failure = 0xed4245,
	Success = 0x57f287
}

export enum DiscosinoEmoji {
	Failure = '<:failure:936345719030288424>',
	Success = '<:success:936345740349939806>',
	MoneySymbol = '<:money:967883821926187038>',
	TokenSymbol = '<:chips:967883373689339926>',
	MixedSymbol = '<:chip_coin:967883068591456256>'
}
