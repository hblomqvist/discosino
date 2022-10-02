import type { ChainableHandler } from './ChainableHandler';

export class HandlerChain<TRequest, TResponse> {
	private readonly handlers: ChainableHandler<TRequest, TResponse>[];

	public constructor(handlers: Iterable<ChainableHandler<TRequest, TResponse>>) {
		this.handlers = [...handlers];

		for (const [index, handler] of this.handlers.entries()) {
			const nextHandler = this.handlers[index + 1];
			if (nextHandler) handler.setNext(nextHandler);
		}
	}

	public handle(request: TRequest): TResponse | Promise<TResponse> {
		return this.handlers[0].handle(request);
	}
}
