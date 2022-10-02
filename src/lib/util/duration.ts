import { numericObjectValues } from './misc';

export enum Duration {
	Year = 31_557_600_000,
	Month = 2_629_800_000,
	Week = 604_800_000,
	Day = 86_400_000,
	Hour = 3_600_000,
	Minute = 60_000,
	Second = 1000,
	Millisecond = 1,
	Microsecond = 0.001
}

const styles: Readonly<StyleList> = {
	compact: ['y', 'mo', 'w', 'd', 'h', 'min', 's', 'ms', 'μs'],
	long: ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond', 'microsecond']
};

export function humanizeDuration(ms: number, options: HumanizeOptions): string {
	const durationValues = numericObjectValues(Duration);

	for (const [index, durationValue] of durationValues.entries()) {
		const convertedValue = ms / durationValue;
		if (convertedValue < 1) continue;

		return formatDurationString(convertedValue, index, options);
	}

	const lastIndex = durationValues.length - 1;

	return formatDurationString(ms / durationValues[lastIndex], lastIndex, options);
}

function formatDurationString(value: number, index: number, { style, maxDecimals }: HumanizeOptions): string {
	const roundedValue = Number(value.toFixed(maxDecimals));
	const char = style === 'long' && roundedValue > 1 ? 's' : '';
	const notation = styles[style][index] + char;

	return `${roundedValue} ${notation}`;
}

interface HumanizeOptions {
	style: Style;
	maxDecimals: number;
}

type Style = 'compact' | 'long';
type StyleList = Record<Style, readonly string[]>;
