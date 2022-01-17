import { CLIENT_OPTIONS } from "#config";
import "#lib/setup";
import { container, SapphireClient } from "@sapphire/framework";

const client = new SapphireClient(CLIENT_OPTIONS);

client.login().catch((err) => {
	container.logger.fatal(err);
	client.destroy();
	process.exit(1);
});
