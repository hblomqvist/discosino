export abstract class ChainableHandler<TRequest, TResponse> {
	private nextHandler?: ChainableHandler<TRequest, TResponse>;

	public setNext(handler: ChainableHandler<TRequest, TResponse>) {
		this.nextHandler = handler;

		return this.nextHandler;
	}

	public handle(request: TRequest): TResponse | Promise<TResponse> {
		if (this.nextHandler) return this.nextHandler.handle(request);

		throw new Error('There are no more available handlers.');
	}
}
