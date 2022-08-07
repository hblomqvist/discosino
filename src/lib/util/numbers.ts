const largeNumberDictionary = {
	numbers: [
		"million",
		"billion",
		"trillion",
		"quadrillion",
		"quintillion",
		"sextillion",
		"septillion",
		"octillion",
		"nonillion"
	],
	units: [
		{ name: "", flags: "" },
		{ name: "un", flags: "" },
		{ name: "duo", flags: "" },
		{ name: "tre", flags: "s" },
		{ name: "quattor", flags: "" },
		{ name: "quinqua", flags: "" },
		{ name: "se", flags: "sx" },
		{ name: "septe", flags: "mn" },
		{ name: "octo", flags: "" },
		{ name: "nove", flags: "mn" }
	],
	tens: [
		{ name: "", flags: "" },
		{ name: "deci", flags: "n" },
		{ name: "viginti", flags: "ms" },
		{ name: "triginta", flags: "ns" },
		{ name: "quadraginta", flags: "ns" },
		{ name: "quinquaginta", flags: "ns" },
		{ name: "sexaginta", flags: "n" },
		{ name: "septuaginta", flags: "n" },
		{ name: "octoginta", flags: "mx" },
		{ name: "nonaginta", flags: "" }
	],
	hundreds: [
		{ name: "", flags: "" },
		{ name: "centi", flags: "nx" },
		{ name: "ducenti", flags: "n" },
		{ name: "trecenti", flags: "ns" },
		{ name: "quadringenti", flags: "ns" },
		{ name: "quingenti", flags: "ns" },
		{ name: "sescenti", flags: "n" },
		{ name: "septingenti", flags: "n" },
		{ name: "octingenti", flags: "mx" },
		{ name: "nongenti", flags: "" }
	]
} as const;

const largeNumberNames = generateLargeNumberNames();

export function humanizeBigInteger(value: bigint) {
	let sign = "";
	let whole = value;

	if (value < 0n) {
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

function generateLargeNumberNames() {
	const { numbers, units, tens, hundreds } = largeNumberDictionary;

	const fullList: string[] = [...numbers];

	for (const hundred of hundreds) {
		for (const ten of tens) {
			const correctedTen =
				!hundred.name && ten.name.endsWith("a") //
					? ten.name.replace(/.$/, "i")
					: ten.name;

			for (const unit of units) {
				if (!ten.name && !hundred.name) continue;

				const flagRegex = /s|x|m|n/g;
				const unitFlags = unit.flags.match(flagRegex);
				const compareFlags = (ten.flags ?? hundred.flags).match(flagRegex);
				const matchedLetter = unitFlags?.filter((flag) => compareFlags?.includes(flag))[0] ?? "";

				fullList.push(`${unit.name}${matchedLetter}${correctedTen}${hundred.name}llion`);
			}
		}
	}

	fullList.push("millinillion");

	return fullList;
}
