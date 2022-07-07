import type { Member } from "@prisma/client";
import { container } from "@sapphire/framework";

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

interface MemberIdentifier {
	guildId: string;
	userId: string;
}
