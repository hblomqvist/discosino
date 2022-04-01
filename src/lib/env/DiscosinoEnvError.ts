import type { DiscosinoEnvAny } from "./types";

export class DiscosinoEnvError extends Error {
	public constructor(key: DiscosinoEnvAny) {
		super(`Environment variable ${key} is empty or undefined.`);

		this.name = this.constructor.name;
	}
}
