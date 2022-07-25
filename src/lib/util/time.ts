import { Time } from "@sapphire/time-utilities";

export function formatDurationShort(ms: number, decimals = 2) {
	let value: number;
	let unit: string;

	switch (true) {
		case ms >= Time.Year:
			value = ms / Time.Year;
			unit = "y";
			break;
		case ms >= Time.Month:
			value = ms / Time.Month;
			unit = "mo";
			break;
		case ms >= Time.Day:
			value = ms / Time.Day;
			unit = "d";
			break;
		case ms >= Time.Hour:
			value = ms / Time.Hour;
			unit = "h";
			break;
		case ms >= Time.Minute:
			value = ms / Time.Minute;
			unit = "min";
			break;
		case ms >= Time.Second:
			value = ms / Time.Second;
			unit = "s";
			break;
		case ms >= 1:
			value = ms;
			unit = "ms";
			break;
		default:
			value = ms * 1000;
			unit = "μs";
	}

	return `${value.toFixed(decimals)} ${unit}`;
}
