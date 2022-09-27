import { strArray, strNotEmpty } from "#util/env";
import type { BotActivityType } from "#util/types";
import { LogLevel } from "@sapphire/framework";
import { ClientOptions, Intents } from "discord.js";
import { cleanEnv, str, url } from "envalid";

export const ENV = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ["development", "production"],
		default: "development"
	}),
	ACTIVITY_NAME: str({ default: "" }),
	ACTIVITY_TYPE: str({
		choices: ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"],
		default: "PLAYING"
	}),
	DEVELOPER_IDS: strArray({ default: [] }),
	DATABASE_URL: url(),
	DISCORD_TOKEN: strNotEmpty(),
	PASTE_GG_TOKEN: str({ default: "" })
});

export const CLIENT_OPTIONS: ClientOptions = {
	intents: [Intents.FLAGS.GUILDS],
	logger: {
		level: ENV.isProd ? LogLevel.Info : LogLevel.Debug
	},
	partials: ["CHANNEL"],
	presence: {
		activities: [
			{
				name: ENV.ACTIVITY_NAME,
				type: ENV.ACTIVITY_TYPE as BotActivityType
			}
		]
	}
};

export const SANITIZER_SUFFIXES = ["DATABASE_URL", "TOKEN"];

export const enum DiscosinoColor {
	Primary = 0x5865f2,
	Failure = 0xed4245,
	Success = 0x57f287
}

export const enum DiscosinoEmoji {
	Failure = "<:failure:936345719030288424>",
	Success = "<:success:936345740349939806>",
	MoneySymbol = "<:money:967883821926187038>",
	TokenSymbol = "<:chips:967883373689339926>",
	MixedSymbol = "<:chip_coin:967883068591456256>"
}
