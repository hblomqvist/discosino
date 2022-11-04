import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommandSuccessPayload, container, Events, Listener, LogLevel } from '@sapphire/framework';
import type { CommandInteraction, GuildChannel } from 'discord.js';
import treeify, { TreeObject } from 'treeify';

@ApplyOptions<Listener.Options>({
	enabled: container.logger.has(LogLevel.Debug),
	event: Events.ChatInputCommandSuccess
})
export class UserListener extends Listener<typeof Events.ChatInputCommandSuccess> {
	public override run({ command, interaction }: ChatInputCommandSuccessPayload) {
		const { guild, user, options } = interaction;

		const title = `Command[${command.name}]`;

		const tree: TreeObject = {
			User: `${user.tag} (${user.id})`,
			Channel: this.getChannel(interaction)
		};

		if (guild) tree.Guild = `${guild.name} (${guild.id})`;
		if (options.data.length) tree.Options = this.buildOptionTree(interaction);

		this.container.logger.debug(title);
		this.container.logger.debug(treeify.asTree(tree, true, true).trimEnd());
	}

	private getChannel(interaction: CommandInteraction): string {
		const channel = interaction.channel as GuildChannel;
		if (!interaction.guild) return 'DM';
		return `#${channel.name} (${channel.id})`;
	}

	private buildOptionTree({ options }: CommandInteraction): TreeObject {
		const optionTree: TreeObject = {};

		for (const { name, value } of options.data) {
			if (value === undefined) continue;
			optionTree[name] = value.toString();
		}

		return optionTree;
	}
}
