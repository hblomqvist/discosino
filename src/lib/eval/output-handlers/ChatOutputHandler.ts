import { codeBlock, formatCode } from "#util/formatters";
import type { EvalPayload } from "../types";
import { EvalOutputHandler } from "./EvalOutputHandler";

export class ChatOutputHandler extends EvalOutputHandler {
	public override handle(payload: EvalPayload) {
		const body = [
			"**Input**",
			codeBlock(formatCode(payload.code, { printWidth: 60 }), "js"),
			"**Output**",
			codeBlock(payload.result, "js"),
			"**Type**",
			codeBlock(payload.type, "ts")
		].join("\n");

		const content = this.buildContent(body, payload.message);

		if (content.length < 4096) return { content };

		payload.message ??= "The message content exceeded the 4096 character limit.";

		return super.handle(payload);
	}
}
