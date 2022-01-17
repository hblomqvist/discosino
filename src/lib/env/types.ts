import type { ActivityType, ColorResolvable } from "discord.js";

type ActivityTypeString = Exclude<ActivityType, "CUSTOM">;
type ColorString = Extract<ColorResolvable, string>;

export type DiscosinoEnvAny = keyof DiscosinoEnv;
export type DiscosinoEnvString = {
	[K in DiscosinoEnvAny]: DiscosinoEnv[K] extends string ? K : never;
}[DiscosinoEnvAny];

export interface DiscosinoEnv {
	NODE_ENV: "development" | "production";

	ADMIN_IDS: string;
	COMMAND_GUILD_IDS: string;

	PRIMARY_COLOR: ColorString;

	CLIENT_ACTIVITY_NAME: string;
	CLIENT_ACTIVITY_TYPE: ActivityTypeString;

	DISCORD_TOKEN: string;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DiscosinoEnv {}
	}
}
