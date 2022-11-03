export function numericObjectValues<T>(object: Record<string, T>): number[] {
	return Object.values(object).filter((value) => !isNaN(Number(value))) as number[];
}
