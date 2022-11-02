import { CLIENT_OPTIONS } from '#config';
import { ENV } from '#lib/env';
import { PrismaClient } from '@prisma/client';
import { container, SapphireClient } from '@sapphire/framework';
import boxen from 'boxen';
import figlet from 'figlet';
import gradient from 'gradient-string';

export class DiscosinoClient extends SapphireClient {
	public readonly version = process.env.npm_package_version ?? '0.0.0';

	public constructor() {
		super(CLIENT_OPTIONS);

		this.database = new PrismaClient();
		container.database = this.database;

		this.printBanner();
	}

	public override login() {
		this.logger.info('Client: Logging in to discord...');

		return super.login(ENV.DISCORD_TOKEN);
	}

	public override async destroy() {
		try {
			await this.database.$disconnect();
		} catch {}

		return super.destroy();
	}

	private printBanner() {
		const titleAscii = figlet.textSync('Discosino', { font: 'Georgia11' });
		const prettyTitle = gradient.retro.multiline(titleAscii.trimEnd());

		const banner = boxen(prettyTitle, {
			padding: {
				left: 3,
				right: 3,
				top: 0,
				bottom: 1
			},
			margin: 1,
			borderStyle: 'round',
			title: this.version,
			titleAlignment: 'right'
		});

		this.logger.info(banner);
	}
}

declare module '@sapphire/framework' {
	interface SapphireClient {
		database: PrismaClient;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		database: PrismaClient;
	}
}
