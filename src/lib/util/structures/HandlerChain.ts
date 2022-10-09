import type { ChainableHandler } from './ChainableHandler';

export class HandlerChain<TPayload, TResponse> {
	private readonly handlers: ChainableHandler<TPayload, TResponse>[];

	public constructor(handlers: Iterable<ChainableHandler<TPayload, TResponse>>) {
		this.handlers = [...handlers];

		for (const [index, handler] of this.handlers.entries()) {
			const nextHandler = this.handlers[index + 1];
			if (nextHandler) handler.setNext(nextHandler);
		}
	}

	public handle(request: TPayload): TResponse | Promise<TResponse> {
		return this.handlers[0].handle(request);
	}
}
