import { CLIENT_OPTIONS } from "#config";
import { PrismaClient } from "@prisma/client";
import { container, SapphireClient } from "@sapphire/framework";

export class DiscosinoClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);

		this.database = new PrismaClient();
		container.database = this.database;
	}

	public override login(token?: string) {
		this.logger.info("Logging in to discord...");

		return super.login(token);
	}

	public override async destroy() {
		try {
			await this.database.$disconnect();
		} catch {}

		return super.destroy();
	}
}

declare module "@sapphire/framework" {
	interface SapphireClient {
		database: PrismaClient;
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		database: PrismaClient;
	}
}
