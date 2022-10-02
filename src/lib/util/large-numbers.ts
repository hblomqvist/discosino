const units: readonly NumberComponent[] = [
	['', ''],
	['un', ''],
	['duo', ''],
	['tre', 's'],
	['quattor', ''],
	['quinqua', ''],
	['se', 'sx'],
	['septe', 'mn'],
	['octo', ''],
	['nove', 'mn']
];

const tens: readonly NumberComponent[] = [
	['', ''],
	['deci', 'n'],
	['viginti', 'ms'],
	['triginta', 'ns'],
	['quadraginta', 'ns'],
	['quinquaginta', 'ns'],
	['sexaginta', 'n'],
	['septuaginta', 'n'],
	['octoginta', 'mx'],
	['nonaginta', '']
];

const hundreds: NumberComponent[] = [
	['', ''],
	['centi', 'nx'],
	['ducenti', 'n'],
	['trecenti', 'ns'],
	['quadringenti', 'ns'],
	['quingenti', 'ns'],
	['sescenti', 'n'],
	['septingenti', 'n'],
	['octingenti', 'mx'],
	['nongenti', '']
];

const numberNames: readonly string[] = [
	'million',
	'billion',
	'trillion',
	'quadrillion',
	'quintillion',
	'sextillion',
	'septillion',
	'octillion',
	'nonillion',
	...extendNumberNames(),
	'millinillion'
];

function extendNumberNames(): readonly string[] {
	return hundreds.flatMap((hundred) =>
		tens.reduce((extensions: string[], ten) => {
			if (!hundred[0] && !ten[0]) return extensions;
			return extensions.concat(...concatenateEveryUnit(ten, hundred));
		}, [])
	);
}

function concatenateEveryUnit(
	[tenName, tenChars]: NumberComponent,
	[hundredName, hundredChars]: NumberComponent
): readonly string[] {
	const compareChars = tenChars.length ? tenChars : hundredChars;
	const correctedTenName = !hundredName && tenName.endsWith('a') ? tenName.replace(/.$/, 'i') : tenName;

	return units.map(([unitName, unitChars]) => {
		const matchedChar = [...unitChars].find((char) => [...compareChars].includes(char)) ?? '';

		return `${unitName}${matchedChar}${correctedTenName}${hundredName}llion`;
	});
}

export function humanizeBigInteger(value: bigint): string {
	let [sign, whole] = value >= 0n ? ['', value] : ['-', -value];

	let index = -2;
	let remainder = 0n;

	while (whole >= 1000n) {
		remainder = whole % 1000n;
		whole /= 1000n;
		index++;
	}

	if (index < 0) return value.toLocaleString('en-US');
	if (index >= numberNames.length) return `${sign}∞`;
	if (!remainder) return `${sign}${whole} ${numberNames[index]}`;

	const decimals = remainder.toString().slice(0, -1);

	return `${sign}${whole}.${decimals} ${numberNames[index]}`;
}

type NumberComponent = readonly [name: string, chars: string];
