import type { MemberIdentifier } from "#util/types";
import type { Guild, User } from "@prisma/client";
import { container } from "@sapphire/framework";

export async function ensureAccount(identifier: MemberIdentifier) {
	const { id } = await ensureMember(identifier);

	return container.database.account.upsert({
		where: { id },
		create: { id },
		update: {}
	});
}

export function ensureGuild(id: string): Promise<Guild> {
	return container.database.guild.upsert({
		where: { id },
		create: { id },
		update: {}
	});
}

export async function ensureMember({ guildId, userId }: MemberIdentifier) {
	await ensureGuild(guildId);
	await ensureUser(userId);

	return container.database.member.upsert({
		where: {
			guildId_userId: { guildId, userId }
		},
		create: { guildId, userId },
		update: {}
	});
}

export function ensureUser(id: string): Promise<User> {
	return container.database.user.upsert({
		where: { id },
		create: { id },
		update: {}
	});
}
