import { strArray, strNotEmpty } from '#core/env';
import type { BotActivityType } from '#util/discord';
import { LogLevel } from '@sapphire/framework';
import { ClientOptions, Intents } from 'discord.js';
import { cleanEnv, str, url } from 'envalid';

export const ENV = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['development', 'production'],
		default: 'development'
	}),
	ACTIVITY_NAME: str({ default: '' }),
	ACTIVITY_TYPE: str({
		choices: ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'COMPETING'],
		default: ''
	}),
	DEVELOPER_IDS: strArray({ default: [] }),
	DATABASE_URL: url(),
	DISCORD_TOKEN: strNotEmpty(),
	PASTE_GG_TOKEN: str({ default: '' })
});

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

export enum DiscosinoColor {
	Primary = 0x5865f2,
	Failure = 0xe74c3c,
	Success = 0x2ecc71
}

export enum DiscosinoEmoji {
	Failure = '<:cross_box:1033100663611211837>',
	Success = '<:check_box:1033100664588484739>',
	MoneySymbol = '<:cash:1033095296223293470>',
	TokenSymbol = '<:chips:1033095298865713193>',
	MixedSymbol = '<:chip_coin:1033095297385115758>'
}
