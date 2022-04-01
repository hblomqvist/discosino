import { failureEmbed } from "#util/embeds";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommandDeniedPayload, Events, Listener, UserError } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
	event: Events.ChatInputCommandDenied
})
export class UserListener extends Listener<typeof Events.ChatInputCommandDenied> {
	public run({ message }: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		const embed = failureEmbed(message);

		return interaction.reply({ embeds: [embed], ephemeral: true });
	}
}
