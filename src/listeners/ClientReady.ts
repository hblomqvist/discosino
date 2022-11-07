import { initDatabase } from '#core/database';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import type { Client } from 'discord.js';

@ApplyOptions<Listener.Options>({
	event: Events.ClientReady
})
export class UserListener extends Listener<typeof Events.ClientReady> {
	public override async run(client: Client) {
		this.container.logger.info(`Client: Successfully logged in to Discord as ${client.user!.tag} (${client.user!.id})`);
		await initDatabase();
	}
}
