import { ZERO_WIDTH_SPACE } from "./constants";

export function codeBlock(code: string, language = ""): string {
	if (!code || /^\n*$/.test(code)) return codeBlock(ZERO_WIDTH_SPACE);

	const escaped = code.replaceAll("`", `\`${ZERO_WIDTH_SPACE}`);

	return `\`\`\`${language}\n${escaped}\n\`\`\``;
}

export function indent(text: string, width = 2) {
	return text.replace(/^/gm, " ".repeat(width));
}
