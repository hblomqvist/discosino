import { LogLevel } from "@sapphire/framework";
import { ClientOptions, Intents } from "discord.js";
import { cleanEnv, EnvMissingError, makeValidator, str, url } from "envalid";

const strArray = makeValidator((value) => value.split(",").map((value) => value.trim()));
const strNotEmpty = makeValidator((value) => {
	if (!value) throw new EnvMissingError();

	return value;
});

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
		activities: [{ name: ENV.ACTIVITY_NAME, type: ENV.ACTIVITY_TYPE }]
	}
};

export const SANITIZER_SUFFIXES = ["DATABASE_URL", "TOKEN"];
