import '#core/setup';

import { DiscosinoClient } from '#core/framework';

const client = new DiscosinoClient();

try {
	await client.login();
} catch (error) {
	client.logger.fatal(error);
	await client.destroy();
	process.exit(1);
}
