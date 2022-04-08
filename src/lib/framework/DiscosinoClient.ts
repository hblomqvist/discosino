import { CLIENT_OPTIONS } from "#config";
import { SapphireClient } from "@sapphire/framework";

export class DiscosinoClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}
}
