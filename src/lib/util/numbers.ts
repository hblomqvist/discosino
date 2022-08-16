const units: LargeNumberSubset = [
	["", ""],
	["un", ""],
	["duo", ""],
	["tre", "s"],
	["quattor", ""],
	["quinqua", ""],
	["se", "sx"],
	["septe", "mn"],
	["octo", ""],
	["nove", "mn"]
];

const tens: LargeNumberSubset = [
	["", ""],
	["deci", "n"],
	["viginti", "ms"],
	["triginta", "ns"],
	["quadraginta", "ns"],
	["quinquaginta", "ns"],
	["sexaginta", "n"],
	["septuaginta", "n"],
	["octoginta", "mx"],
	["nonaginta", ""]
];
const hundreds: LargeNumberSubset = [
	["", ""],
	["centi", "nx"],
	["ducenti", "n"],
	["trecenti", "ns"],
	["quadringenti", "ns"],
	["quingenti", "ns"],
	["sescenti", "n"],
	["septingenti", "n"],
	["octingenti", "mx"],
	["nongenti", ""]
];

const largeNumberNames: readonly string[] = [
	"million",
	"billion",
	"trillion",
	"quadrillion",
	"quintillion",
	"sextillion",
	"septillion",
	"octillion",
	"nonillion",
	...extendLargeNumberNames()
];

function extendLargeNumberNames(): readonly string[] {
	const extendedNames = [];

	for (const hundred of hundreds) {
		for (const ten of tens) {
			if (!ten[0] && !hundred[0]) continue;

			extendedNames.push(...concatenateEveryUnit(ten, hundred));
		}
	}

	extendedNames.push("millinillion");

	return extendedNames;
}

function concatenateEveryUnit([tenName, tenChars]: LargeNumberTuple, [hundredName, hundredChars]: LargeNumberTuple) {
	const compareChars = tenChars.length ? tenChars : hundredChars;

	const correctedTenName =
		!hundredName && tenName.endsWith("a") //
			? tenName.replace(/.$/, "i")
			: tenName;

	return units.map(([unitName, unitChars]) => {
		const matchedChar = [...unitChars].filter((char) => [...compareChars].includes(char))[0] ?? "";

		return `${unitName}${matchedChar}${correctedTenName}${hundredName}llion`;
	});
}

export function humanizeBigInteger(value: bigint) {
	let sign = "";
	let whole = value;

	if (whole < 0n) {
		sign = "-";
		whole = -value;
	}

	if (whole < BigInt(1e6)) return value.toLocaleString("en-US");

	let index = -2;
	let remainder = 0n;

	while (whole >= 1000n) {
		remainder = whole % 1000n;
		whole /= 1000n;
		index++;
	}

	if (index >= largeNumberNames.length) return `${sign}∞`;
	if (!remainder) return `${sign}${whole} ${largeNumberNames[index]}`;

	const decimals = remainder.toString().slice(0, -1);

	return `${sign}${whole}.${decimals} ${largeNumberNames[index]}`;
}

type LargeNumberTuple = readonly [name: string, chars: string];
type LargeNumberSubset = readonly LargeNumberTuple[];
