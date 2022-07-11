import type { MemberIdentifier } from "#util/types";
import type { Member } from "@prisma/client";
import { container } from "@sapphire/framework";

export function findMember(identifier: MemberIdentifier): Promise<Member> {
	return container.database.member.findUniqueOrThrow({
		where: {
			guildId_userId: identifier
		}
	});
}

export async function findAccount(identifier: MemberIdentifier) {
	const { id } = await findMember(identifier);

	return container.database.account.findUniqueOrThrow({
		where: { id }
	});
}

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
		where: { id },
		create: { id },
		update: {}
	});
}
