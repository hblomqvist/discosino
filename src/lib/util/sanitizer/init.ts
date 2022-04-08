import { initSanitizer } from ".";

const secrets = new Set<string>();
const suffixes = ["PASSWORD", "TOKEN", "SECRET", "KEY"];

for (const [key, value] of Object.entries(process.env)) {
	if (!value) continue;
	if (suffixes.some((suffix) => key.endsWith(suffix))) secrets.add(value);
}

initSanitizer([...secrets]);
