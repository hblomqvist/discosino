import type { Member } from "@prisma/client";
import { container } from "@sapphire/framework";
import type { MemberIdentifier } from "./types";

export function ensureMember(identifier: MemberIdentifier): Promise<Member> {
	return container.database.member.upsert({
		where: {
			guildId_userId: identifier
		},
		create: identifier,
		update: {}
	});
}

export async function ensureAccount(identifier: MemberIdentifier) {
	const { id } = await ensureMember(identifier);

	return container.database.account.upsert({
		where: { ownerId: id },
		create: { ownerId: id },
		update: {}
	});
}
