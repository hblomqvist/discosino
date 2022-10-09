export abstract class ChainableHandler<TPayload, TResponse> {
	private nextHandler?: ChainableHandler<TPayload, TResponse>;

	public setNext(handler: ChainableHandler<TPayload, TResponse>) {
		this.nextHandler = handler;

		return this.nextHandler;
	}

	public handle(request: TPayload): TResponse | Promise<TResponse> {
		if (this.nextHandler) return this.nextHandler.handle(request);

		throw new Error('There are no more available handlers.');
	}
}
