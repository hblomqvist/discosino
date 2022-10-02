if (process.env.CI !== 'true') {
	try {
		const husky = await import('husky');
		husky.install();
	} catch (error) {
		if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
	}
}
