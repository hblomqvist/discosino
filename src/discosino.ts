import '#lib/setup';

import { DiscosinoClient } from '#lib/framework';

const client = new DiscosinoClient();

try {
	await client.login();
} catch (error) {
	client.logger.fatal(error);
	await client.destroy();
	process.exit(1);
}
