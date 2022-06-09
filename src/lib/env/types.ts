import type { ActivityType } from "discord.js";

type ActivityTypeString = Exclude<ActivityType, "CUSTOM">;

export type DiscosinoEnvAny = keyof DiscosinoEnv;
export type DiscosinoEnvString = {
	[K in DiscosinoEnvAny]: DiscosinoEnv[K] extends string ? K : never;
}[DiscosinoEnvAny];

export interface DiscosinoEnv {
	NODE_ENV: "development" | "production";

	CLIENT_ACTIVITY_NAME: string;
	CLIENT_ACTIVITY_TYPE: ActivityTypeString;

	DEVELOPER_IDS: string;

	DATABASE_URL: string;

	DISCORD_TOKEN: string;
	PASTE_GG_TOKEN: string;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DiscosinoEnv {}
	}
}
