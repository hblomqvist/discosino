import { ENV } from '#config';
import { fetch, FetchMethods, FetchResultTypes, QueryError } from '@sapphire/fetch';
import { container } from '@sapphire/framework';
import type { EvalPayload } from '../types';
import { EvalOutputHandler } from './EvalOutputHandler';

export class PastebinOutputHandler extends EvalOutputHandler {
	private readonly token = ENV.PASTE_GG_TOKEN;

	public override async handle(payload: EvalPayload) {
		if (!this.token) {
			payload.message ??= 'No API key for **paste.gg** has been set.';

			return super.handle(payload);
		}

		let response: PasteResponse;

		try {
			response = await this.uploadPaste(payload);
		} catch (error) {
			container.logger.warn(error);
			payload.message ??= `Failed to upload to **paste.gg**. Error: ${(error as QueryError).code}`;

			return super.handle(payload);
		}

		const { id } = response.result;
		const link = `https://paste.gg/${id}`;
		const body = `I've sent the output to **[paste.gg](${link})**.`;

		return { content: this.buildContent(body, payload.message) };
	}

	private uploadPaste({ prettyInput, result }: EvalPayload) {
		return fetch<PasteResponse>(
			'https://api.paste.gg/v1/pastes',
			{
				method: FetchMethods.Post,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Key ${this.token}`
				},
				body: JSON.stringify({
					name: 'Eval',
					visibility: 'unlisted',
					files: [
						{
							name: 'Input',
							content: {
								format: 'text',
								value: prettyInput
							},
							highlight_language: 'javascript'
						},
						{
							name: 'Output',
							content: {
								format: 'text',
								value: result.output
							},
							highlight_language: result.isError ? null : 'typescript'
						},
						{
							name: 'Type',
							content: {
								format: 'text',
								value: result.type
							},
							highlight_language: 'typescript'
						}
					]
				})
			},
			FetchResultTypes.JSON
		);
	}
}

interface PasteResponse {
	result: { id: string };
}
