import type { FileOptions } from "discord.js";

export interface EvalPayload {
	success: boolean;
	input: string;
	output: string;
	type: string;
	time: number;
	message?: string;
}

export interface EvalResponse {
	content: string;
	files?: FileOptions[];
}
