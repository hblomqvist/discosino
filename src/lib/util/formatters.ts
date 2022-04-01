import { ZERO_WIDTH_SPACE } from "#lib/constants";
import { format, Options } from "prettier";

export function codeBlock(code: string, language = ""): string {
	if (!code || /^\n*$/.test(code)) return codeBlock(ZERO_WIDTH_SPACE);

	const escaped = code.replaceAll("`", `\`${ZERO_WIDTH_SPACE}`);

	return `\`\`\`${language}\n${escaped}\n\`\`\``;
}

export function formatCode(code: string, options?: Options) {
	try {
		const formattedCode = format(code, {
			parser: "babel",
			singleQuote: true,
			trailingComma: "none",
			...options
		}).replace(/\n$/, "");

		return formattedCode || code;
	} catch {
		return code;
	}
}

export function indent(text: string, width = 2) {
	return text.replace(/^/gm, " ".repeat(width));
}
