import type { MemberIdentifier } from "#util/types";
import { ensureAccount } from "./database";

export async function getBalance(identifier: MemberIdentifier): Promise<AccountBalance> {
	const { moneyString, tokenString } = await ensureAccount(identifier);

	return {
		moneyAmount: BigInt(moneyString),
		tokenAmount: BigInt(tokenString)
	};
}

interface AccountBalance {
	moneyAmount: bigint;
	tokenAmount: bigint;
}
