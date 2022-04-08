import { ChainableHandler } from "#util/structures";
import type { EvalOutput, EvalPayload } from "../types";

export abstract class EvalOutputHandler extends ChainableHandler<EvalPayload, EvalOutput> {
	protected buildContent(body: string, message: string | undefined) {
		return message ? `${message}\n\n${body}` : body;
	}
}
