import { DiscosinoEmoji } from '#config';
import { ensureAccount } from '#util/database';
import type { MemberIdentifier } from '#util/discord';
import { humanizeBigInteger } from '#util/large-numbers';
import { container } from '@sapphire/framework';

export async function getBalance(identifier: MemberIdentifier): Promise<AccountBalance> {
	const account = await container.database.member
		.findUnique({
			where: {
				guildId_userId: identifier
			}
		})
		.account();

	return {
		moneyAmount: BigInt(account?.moneyString ?? '0'),
		tokenAmount: BigInt(account?.tokenString ?? '0')
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

export function formatFunds(type: FundsType, amount: bigint) {
	let symbol: string;

	switch (type) {
		case 'money':
			symbol = DiscosinoEmoji.MoneySymbol;
			break;
		case 'tokens':
			symbol = DiscosinoEmoji.TokenSymbol;
			break;
		case 'total':
			symbol = DiscosinoEmoji.MixedSymbol;
			break;
	}

	return `${symbol} ${humanizeBigInteger(amount)}`;
}

interface AccountBalance {
	moneyAmount: bigint;
	tokenAmount: bigint;
}

type FundsType = 'money' | 'tokens' | 'total';
