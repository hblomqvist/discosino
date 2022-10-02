import { ENV } from '#config';
import { ChatInputCommand, ContextMenuCommand, Precondition } from '@sapphire/framework';
import type { Snowflake } from 'discord.js';

export class UserPrecondition extends Precondition {
	public override chatInputRun({ user }: ChatInputCommand.Interaction) {
		return this.verify(user.id);
	}

	public override contextMenuRun({ user }: ContextMenuCommand.Interaction) {
		return this.verify(user.id);
	}

	private verify(userId: Snowflake) {
		return ENV.DEVELOPER_IDS.includes(userId)
			? this.ok()
			: this.error({ message: 'This command can only be used by developers.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		DeveloperOnly: never;
	}
}
