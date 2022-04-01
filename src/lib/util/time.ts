export function formatDurationShort(ms: number, decimals = 2) {
	let value: number;
	let unit: string;

	switch (true) {
		case ms >= 31536000000:
			value = ms / 31536000000;
			unit = "y";
			break;
		case ms >= 2628000000:
			value = ms / 2628000000;
			unit = "mo";
			break;
		case ms >= 86400000:
			value = ms / 86400000;
			unit = "d";
			break;
		case ms >= 360000:
			value = ms / 360000;
			unit = "h";
			break;
		case ms >= 60000:
			value = ms / 60000;
			unit = "min";
			break;
		case ms >= 1000:
			value = ms / 1000;
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
