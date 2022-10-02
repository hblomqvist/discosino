import { ESLint } from 'eslint';

async function removeIgnoredFiles(files) {
	const eslint = new ESLint();
	const ignoreList = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
	const filteredFiles = files.filter((value, index) => !ignoreList[index]);

	return filteredFiles.join(' ');
}

export default {
	'**/*.{ts,js}': async (files) => `eslint --fix --max-warnings=0 ${await removeIgnoredFiles(files)}`
};
