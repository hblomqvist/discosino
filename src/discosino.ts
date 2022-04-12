// organize-imports-ignore
import "@sapphire/plugin-logger/register";
import "#util/sanitizer/init";

import { DiscosinoClient } from "#lib/framework";
import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

const client = new DiscosinoClient();

client.logger.info("Logging in to discord...");

try {
	await client.login();
} catch (error) {
	client.logger.fatal(error);
	client.destroy();
	process.exit(1);
}
