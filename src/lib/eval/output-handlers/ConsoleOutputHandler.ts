import { indent } from "#util/formatters";
import { container } from "@sapphire/framework";
import type { EvalPayload } from "../types";
import { EvalOutputHandler } from "./EvalOutputHandler";

export class ConsoleOutputHandler extends EvalOutputHandler {
	public override handle(payload: EvalPayload) {
		const output = this.createOutput(payload);

		container.logger.info(output);
		const body = "I've logged the output to the console.";

		return { content: this.buildContent(body, payload.message) };
	}

	private createOutput({ prettyInput, result }: EvalPayload) {
		return [
			"[EVAL]",
			indent("Input:", 2),
			indent(prettyInput, 4),
			"",
			indent("Output:", 2),
			indent(result.output, 4),
			"",
			indent("Type:", 2),
			indent(result.type, 4)
		].join("\n");
	}
}
