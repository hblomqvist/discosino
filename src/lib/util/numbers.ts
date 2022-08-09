const largeNumberDictionary: Record<string, readonly NameCharsTuple[]> = {
	units: [
		["", []],
		["un", []],
		["duo", []],
		["tre", ["s"]],
		["quattor", []],
		["quinqua", []],
		["se", ["s", "x"]],
		["septe", ["m", "n"]],
		["octo", []],
		["nove", ["m", "n"]]
	],
	tens: [
		["", []],
		["deci", ["n"]],
		["viginti", ["m", "s"]],
		["triginta", ["n", "s"]],
		["quadraginta", ["n", "s"]],
		["quinquaginta", ["n", "s"]],
		["sexaginta", ["n"]],
		["septuaginta", ["n"]],
		["octoginta", ["m", "x"]],
		["nonaginta", []]
	],
	hundreds: [
		["", []],
		["centi", ["n", "x"]],
		["ducenti", ["n"]],
		["trecenti", ["n", "s"]],
		["quadringenti", ["n", "s"]],
		["quingenti", ["n", "s"]],
		["sescenti", ["n"]],
		["septingenti", ["n"]],
		["octingenti", ["m", "x"]],
		["nongenti", []]
	]
};

const largeNumberNames = generateLargeNumberNames();

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

function generateLargeNumberNames(): readonly string[] {
	const { units, tens, hundreds } = largeNumberDictionary;

	const largeNumberNames = [
		"million",
		"billion",
		"trillion",
		"quadrillion",
		"quintillion",
		"sextillion",
		"septillion",
		"octillion",
		"nonillion"
	];

	for (const [hundredName, hundredChars] of hundreds) {
		for (const [tenName, tenChars] of tens) {
			if (!tenName && !hundredName) continue;

			const compareChars = tenChars.length ? tenChars : hundredChars;

			const correctedTenName =
				!hundredName && tenName.endsWith("a") //
					? tenName.replace(/.$/, "i")
					: tenName;

			for (const [unitName, unitChars] of units) {
				const matchedChar = unitChars.filter((char) => compareChars.includes(char))[0] ?? "";

				largeNumberNames.push(`${unitName}${matchedChar}${correctedTenName}${hundredName}llion`);
			}
		}
	}

	largeNumberNames.push("millinillion");

	return largeNumberNames;
}

type NameCharsTuple = readonly [name: string, chars: readonly string[]];
