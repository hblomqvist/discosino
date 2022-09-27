import type { ActivityType } from "discord.js";

export interface MemberIdentifier {
	guildId: string;
	userId: string;
}

export type BotActivityType = Exclude<ActivityType, "CUSTOM">;
export type NodeError = NodeJS.ErrnoException;
