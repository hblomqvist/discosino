import { getErrorMessage } from '#core/errors';
import { createEmbed } from '#util/discord';
import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommandDeniedPayload, Events, Listener, UserError } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({
	event: Events.ChatInputCommandDenied
})
export class UserListener extends Listener<typeof Events.ChatInputCommandDenied> {
	public override run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		const embed = createEmbed('Failure', getErrorMessage(error));

		return interaction.reply({ embeds: [embed], ephemeral: true });
	}
}
