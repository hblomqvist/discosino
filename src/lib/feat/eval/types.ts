import type { FileOptions } from 'discord.js';

export interface EvalResult {
	success: boolean;
	isError: boolean;
	output: string;
	type: string;
	time: number;
}

export interface EvalPayload {
	prettyInput: string;
	result: EvalResult;
	message?: string;
}

export interface EvalResponse {
	content: string;
	files?: FileOptions[];
}
