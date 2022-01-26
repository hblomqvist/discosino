import { DiscosinoEnv, DiscosinoEnvAny, DiscosinoEnvError, DiscosinoEnvString } from "#lib/env";
import { isNullishOrEmpty } from "@sapphire/utilities";

export function envParseString<K extends DiscosinoEnvString>(key: K, defaultValue?: DiscosinoEnv[K]): DiscosinoEnv[K] {
	const value = process.env[key];

	if (value) return value;
	if (defaultValue !== undefined) return defaultValue;
	throw new DiscosinoEnvError(key);
}

export function envParseArray(key: DiscosinoEnvString, defaultValue?: string[]): string[] {
	const value = process.env[key];

	if (value) return value.split(" ");
	if (defaultValue !== undefined) return defaultValue;
	throw new DiscosinoEnvError(key);
}

export function envIsDefined(...keys: readonly DiscosinoEnvAny[]): boolean {
	return keys.every((key) => {
		const value = process.env[key];
		return !isNullishOrEmpty(value);
	});
}
