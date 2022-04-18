import { CLIENT_OPTIONS } from "#config";
import { SapphireClient } from "@sapphire/framework";

export class DiscosinoClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}

	public override login(token?: string) {
		this.logger.info("Logging in to discord...");

		return super.login(token);
	}
}
