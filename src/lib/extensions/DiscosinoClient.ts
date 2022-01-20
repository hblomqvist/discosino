import { SapphireClient } from "@sapphire/framework";
import { CLIENT_OPTIONS } from "config";

export class DiscosinoClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}
}
