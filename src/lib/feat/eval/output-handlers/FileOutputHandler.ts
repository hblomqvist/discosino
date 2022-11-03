import type { BufferResolvable } from 'discord.js';
import type { EvalPayload } from '../types';
import { EvalOutputHandler } from './EvalOutputHandler';

export class FileOutputHandler extends EvalOutputHandler {
	public override handle(payload: EvalPayload) {
		const files = this.createFiles(payload);

		for (const { attachment } of files) {
			if (attachment.length > 8_000_000) {
				payload.message ??= 'One or more files exceeded the 8 MB size limit.';

				return super.handle(payload);
			}
		}

		const body = `I've sent the output as files.`;

		return { content: this.buildContent(body, payload.message), files };
	}

	private createFiles({ prettyInput, result }: EvalPayload): File[] {
		return [
			{
				name: 'input.js',
				attachment: Buffer.from(prettyInput)
			},
			{
				name: 'output.js',
				attachment: Buffer.from(result.output)
			},
			{
				name: 'type.ts',
				attachment: Buffer.from(result.type)
			}
		];
	}
}

interface File {
	name: string;
	attachment: BufferResolvable;
}
