import { ESLint } from "eslint";

async function removeIgnoredFiles(files) {
	const eslint = new ESLint();
	const ignoreList = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
	const filteredFiles = files.filter((value, index) => !ignoreList[index]);

	return filteredFiles.join(" ");
}

export default {
	"**/*.ts": () => "yarn typecheck",
	"**/*.{ts,js}": async (files) => `eslint --fix ${await removeIgnoredFiles(files)}`
};
