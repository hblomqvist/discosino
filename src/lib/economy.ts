import type { MemberIdentifier } from "#util/types";
import { findAccount } from "./database";

export async function getBalance(identifier: MemberIdentifier): Promise<AccountBalance> {
	try {
		const { moneyString, tokenString } = await findAccount(identifier);

		return {
			moneyAmount: BigInt(moneyString),
			tokenAmount: BigInt(tokenString)
		};
	} catch {
		return {
			moneyAmount: 0n,
			tokenAmount: 0n
		};
	}
}

interface AccountBalance {
	moneyAmount: bigint;
	tokenAmount: bigint;
}
