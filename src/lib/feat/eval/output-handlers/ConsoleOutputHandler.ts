import { container } from '@sapphire/framework';
import treeify, { TreeObject } from 'treeify';
import type { EvalPayload } from '../types';
import { EvalOutputHandler } from './EvalOutputHandler';

export class ConsoleOutputHandler extends EvalOutputHandler {
	public override handle(payload: EvalPayload) {
		container.logger.info('[Eval]');
		container.logger.info(this.buildOutputTree(payload));

		return { content: this.buildContent(`I've logged the output to the console.`, payload.message) };
	}

	private buildOutputTree({ prettyInput, result }: EvalPayload): string {
		const outputTree: TreeObject = {
			Input: this.formatMultiline(prettyInput),
			Output: this.formatMultiline(result.output),
			Type: result.type
		};

		return treeify.asTree(outputTree, true, true).trimEnd();
	}

	private formatMultiline(input: string) {
		const lines = input.split(/\r?\n/);

		const firstLine = lines.shift();
		const remainingLines = lines.map((line) => `│${' '.repeat(5)}${line}`);

		const value = [firstLine, ...remainingLines].join('\n');

		return { [value]: null } as unknown as TreeObject;
	}
}
