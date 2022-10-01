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
			this.indent("Input:", 2),
			this.indent(prettyInput, 4),
			"",
			this.indent("Output:", 2),
			this.indent(result.output, 4),
			"",
			this.indent("Type:", 2),
			this.indent(result.type, 4)
		].join("\n");
	}

	private indent(text: string, width = 2) {
		return text.replace(/^/gm, " ".repeat(width));
	}
}
