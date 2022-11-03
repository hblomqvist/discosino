import { ChainableHandler } from '#util/structures';
import type { EvalPayload, EvalResponse } from '../types';

export abstract class EvalOutputHandler extends ChainableHandler<EvalPayload, EvalResponse> {
	protected buildContent(body: string, message: string | undefined) {
		return message ? `${message}\n\n${body}` : body;
	}
}
