import { SANITIZER_SUFFIXES } from '#config';
import { initSanitizer } from '.';

const secrets = new Set<string>();

for (const [key, value] of Object.entries(process.env)) {
	if (!value) continue;
	if (SANITIZER_SUFFIXES.some((suffix) => key.endsWith(suffix))) secrets.add(value);
}

initSanitizer([...secrets]);
