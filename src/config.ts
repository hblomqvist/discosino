import { envIsDefined, envParseArray, envParseString } from "#lib/env";
import { LogLevel } from "@sapphire/framework";
import { ActivitiesOptions, ClientOptions, Intents } from "discord.js";

export const PRODUCTION = envParseString("NODE_ENV") === "production";

export const DEVELOPER_IDS = envParseArray("DEVELOPER_IDS", []);
export const COMMAND_GUILD_IDS = envParseArray("COMMAND_GUILD_IDS", []);

export const CLIENT_OPTIONS: ClientOptions = {
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	logger: {
		level: PRODUCTION ? LogLevel.Info : LogLevel.Debug
	},
	presence: { activities: parseActivity() }
};

function parseActivity(): ActivitiesOptions[] {
	if (!envIsDefined("CLIENT_ACTIVITY_NAME")) return [];

	return [
		{
			name: envParseString("CLIENT_ACTIVITY_NAME"),
			type: envParseString("CLIENT_ACTIVITY_TYPE", "PLAYING")
		}
	];
}
