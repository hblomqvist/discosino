import type { MemberIdentifier } from "#util/types";
import { container } from "@sapphire/framework";
import { ensureAccount } from "./database";

export async function getBalance(identifier: MemberIdentifier): Promise<AccountBalance> {
	const account = await container.database.member
		.findUnique({
			where: {
				guildId_userId: identifier
			}
		})
		.account();

	return {
		moneyAmount: BigInt(account?.moneyString ?? "0"),
		tokenAmount: BigInt(account?.tokenString ?? "0")
	};
}

export async function setBalance(identifier: MemberIdentifier, { moneyAmount, tokenAmount }: Partial<AccountBalance>) {
	const { id } = await ensureAccount(identifier);

	await container.database.account.update({
		where: { id },
		data: {
			moneyString: moneyAmount?.toString(),
			tokenString: tokenAmount?.toString()
		}
	});
}

export async function incrementBalance(identifier: MemberIdentifier, increments: Partial<AccountBalance>) {
	const { moneyAmount, tokenAmount } = await getBalance(identifier);

	const updatedBalance = {
		moneyAmount: moneyAmount + (increments.moneyAmount ?? 0n),
		tokenAmount: tokenAmount + (increments.tokenAmount ?? 0n)
	};

	await setBalance(identifier, updatedBalance);
}

export function formatFunds(amount: number | bigint) {
	if (amount > 1e18) return "Eternal Wealth";

	const notations = [
		{ exponent: 15, suffix: "Q" },
		{ exponent: 12, suffix: "T" },
		{ exponent: 9, suffix: "B" },
		{ exponent: 6, suffix: "M" }
	];

	const amountString = (typeof amount === "number" ? Math.trunc(amount) : amount).toString();

	for (const { exponent, suffix } of notations) {
		if (amount >= 10 ** exponent) {
			const integerPart = amountString.slice(0, -exponent);
			const fractionPart = amountString.slice(-exponent, -exponent + 2);

			return `${integerPart}.${fractionPart}${suffix}`;
		}
	}

	return amount.toLocaleString("en-US");
}

interface AccountBalance {
	moneyAmount: bigint;
	tokenAmount: bigint;
}
