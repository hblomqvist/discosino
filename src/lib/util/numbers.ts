const units: NumberComponent[] = [
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

const tens: NumberComponent[] = [
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

const hundreds: NumberComponent[] = [
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

function extendNumberNames() {
	const extensions = [];

	for (const hundred of hundreds) {
		for (const ten of tens) {
			if (!ten[0] && !hundred[0]) continue;
			extensions.push(...concatenateEveryUnit(ten, hundred));
		}
	}

	extensions.push("millinillion");

	return extensions;
}

const numberNames = [
	"million",
	"billion",
	"trillion",
	"quadrillion",
	"quintillion",
	"sextillion",
	"septillion",
	"octillion",
	"nonillion",
	...extendNumberNames()
];

function concatenateEveryUnit([tenName, tenChars]: NumberComponent, [hundredName, hundredChars]: NumberComponent) {
	const compareChars = tenChars.length ? tenChars : hundredChars;
	const correctedTenName = !hundredName && tenName.endsWith("a") ? tenName.replace(/.$/, "i") : tenName;

	return units.map(([unitName, unitChars]) => {
		const matchedChar = [...unitChars].find((char) => [...compareChars].includes(char)) ?? "";

		return `${unitName}${matchedChar}${correctedTenName}${hundredName}llion`;
	});
}

export function humanizeBigInteger(value: bigint) {
	const isPositive = value >= 0n;
	const sign = isPositive ? "" : "-";
	let whole = isPositive ? value : -value;

	if (whole < BigInt(1e6)) return value.toLocaleString("en-US");

	let index = -2;
	let remainder = 0n;

	while (whole >= 1000n) {
		remainder = whole % 1000n;
		whole /= 1000n;
		index++;
	}

	if (index >= numberNames.length) return `${sign}∞`;
	if (!remainder) return `${sign}${whole} ${numberNames[index]}`;

	const decimals = remainder.toString().slice(0, -1);

	return `${sign}${whole}.${decimals} ${numberNames[index]}`;
}

type NumberComponent = [name: string, chars: string];
