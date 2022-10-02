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

const durationValues = numericObjectValues(Duration);

export function humanizeDuration(ms: number, options: HumanizeOptions): string {
	for (const [index, durationValue] of durationValues.entries()) {
		if (Math.abs(ms) / durationValue < 1) continue;

		return formatDurationString(ms, index, options);
	}

	return formatDurationString(ms, durationValues.length - 1, options);
}

function formatDurationString(ms: number, index: number, { style, maxDecimals }: HumanizeOptions): string {
	const sign = ms >= 0 ? '' : '-';
	const convertedAbsValue = Number((Math.abs(ms) / durationValues[index]).toFixed(maxDecimals));
	const char = style === 'long' && convertedAbsValue !== 1 ? 's' : '';
	const notation = styles[style][index] + char;

	return `${sign}${convertedAbsValue} ${notation}`;
}

interface HumanizeOptions {
	style: Style;
	maxDecimals: number;
}

type Style = 'compact' | 'long';
type StyleList = Record<Style, readonly string[]>;
