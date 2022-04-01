import type { ChainableHandler } from "./ChainableHandler";

export class HandlerChain<TRequest, TResponse> {
	private handlers: ChainableHandler<TRequest, TResponse>[];

	public constructor(...handlers: ChainableHandler<TRequest, TResponse>[]) {
		this.handlers = handlers;
	}

	public handle(request: TRequest): TResponse | Promise<TResponse> {
		this.handlers.reduce((handler, nextHandler) => {
			handler.setNext(nextHandler);

			return nextHandler;
		});

		return this.handlers[0].handle(request);
	}
}
