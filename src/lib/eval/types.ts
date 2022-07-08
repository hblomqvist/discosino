import type { FileOptions } from "discord.js";

export interface EvalPayload {
	success: boolean;
	code: string;
	result: string;
	type: string;
	time: number;
	message?: string;
}

export interface EvalResponse {
	content: string;
	files?: FileOptions[];
}
