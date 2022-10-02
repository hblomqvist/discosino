import { codeBlock } from '#util/discord';
import type { EvalPayload } from '../types';
import { EvalOutputHandler } from './EvalOutputHandler';

export class ChatOutputHandler extends EvalOutputHandler {
	public override handle(payload: EvalPayload) {
		const body = this.createBody(payload);
		const content = this.buildContent(body, payload.message);

		if (content.length < 4096) return { content };

		payload.message ??= `The message content exceeded the 4096 character limit.`;

		return super.handle(payload);
	}

	private createBody({ prettyInput, result }: EvalPayload) {
		return [
			'**Input**',
			codeBlock(prettyInput, 'js'),
			'**Output**',
			codeBlock(result.output, result.isError ? '' : 'js'),
			'**Type**',
			codeBlock(result.type, 'ts')
		].join('\n');
	}
}
