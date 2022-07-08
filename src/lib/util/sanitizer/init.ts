import { initSanitizer } from ".";

const secrets = new Set<string>();
const suffixes = ["PASSWORD", "PASS", "TOKEN", "SECRET", "KEY", "URL"];

for (const [key, value] of Object.entries(process.env)) {
	if (!value) continue;
	if (suffixes.some((suffix) => key.endsWith(suffix))) secrets.add(value);
}

initSanitizer([...secrets]);
