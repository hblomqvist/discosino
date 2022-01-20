require("#lib/setup");

import { DiscosinoClient } from "#lib/extensions";
import { container } from "@sapphire/framework";

const client = new DiscosinoClient();

client.login().catch((err) => {
	container.logger.fatal(err);
	client.destroy();
	process.exit(1);
});
