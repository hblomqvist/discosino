import { DEVELOPER_IDS } from "#config";
import { ChatInputCommand, ContextMenuCommand, Precondition } from "@sapphire/framework";
import type { Snowflake } from "discord.js";

export class UserPrecondition extends Precondition {
	public override chatInputRun({ user }: ChatInputCommand.Interaction, command: ChatInputCommand) {
		return this.verify(user.id, command.name);
	}

	public override contextMenuRun({ user }: ContextMenuCommand.Interaction, command: ContextMenuCommand) {
		return this.verify(user.id, command.name);
	}

	private verify(userId: Snowflake, commandName: string) {
		return DEVELOPER_IDS.includes(userId)
			? this.ok()
			: this.error({ message: `The \`${commandName}\` command can only be used by developers.` });
	}
}

declare module "@sapphire/framework" {
	interface Preconditions {
		DeveloperOnly: never;
	}
}
