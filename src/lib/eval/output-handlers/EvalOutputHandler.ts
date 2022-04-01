import { ChainableHandler } from "#util/structures";
import type { EvalOutput, EvalPayload } from "../types";

export abstract class EvalOutputHandler extends ChainableHandler<EvalPayload, EvalOutput> {
	protected buildContent(body: string, message: string | undefined) {
		if (message) return `${message}\n\n${body}`;

		return body;
	}
}
