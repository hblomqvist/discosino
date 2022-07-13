import { LogLevel } from "@sapphire/framework";
import { ClientOptions, Intents } from "discord.js";
import { cleanEnv, makeValidator, str, url } from "envalid";

const strArray = makeValidator((value) => value.split(" "));

export const ENV = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ["development", "production"],
		default: "development"
	}),
	CLIENT_ACTIVITY_NAME: str({ default: "" }),
	CLIENT_ACTIVITY_TYPE: str({
		choices: ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"],
		default: "PLAYING"
	}),
	DEVELOPER_IDS: strArray({ default: [] }),
	DATABASE_URL: url(),
	DISCORD_TOKEN: str(),
	PASTE_GG_TOKEN: str({ default: "" })
});

export const CLIENT_OPTIONS: ClientOptions = {
	intents: [Intents.FLAGS.GUILDS],
	logger: {
		level: ENV.isProd ? LogLevel.Info : LogLevel.Debug
	},
	partials: ["CHANNEL"],
	presence: {
		activities: [{ name: ENV.CLIENT_ACTIVITY_NAME, type: ENV.CLIENT_ACTIVITY_TYPE }]
	}
};
