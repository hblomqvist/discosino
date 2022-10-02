import { ChainableHandler } from '#util/structures';
import { format, Options } from 'prettier';
import type { EvalOutput, EvalPayload } from '../types';

export abstract class EvalOutputHandler extends ChainableHandler<EvalPayload, EvalOutput> {
	protected buildContent(body: string, message: string | undefined) {
		return message ? `${message}\n\n${body}` : body;
	}

	protected formatCode(code: string, options?: Options) {
		try {
			const formattedCode = format(code, {
				parser: 'babel',
				singleQuote: true,
				trailingComma: 'none',
				...options
			}).replace(/\n$/, '');

			return formattedCode || code;
		} catch {
			return code;
		}
	}
}
