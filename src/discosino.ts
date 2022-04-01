// organize-imports-ignore
import "@sapphire/plugin-logger/register";
import "#util/sanitizer/init";

import { DiscosinoClient } from "#lib/framework";
import { ApplicationCommandRegistries, container, RegisterBehavior } from "@sapphire/framework";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);

const client = new DiscosinoClient();

client.login().catch((err) => {
	container.logger.fatal(err);
	client.destroy();
	process.exit(1);
});
