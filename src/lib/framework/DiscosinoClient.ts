import { CLIENT_OPTIONS } from "#root/config";
import { SapphireClient } from "@sapphire/framework";

export class DiscosinoClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}
}
