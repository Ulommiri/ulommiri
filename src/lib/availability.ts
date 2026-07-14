export type BookedRange = {
	from: string;
	to: string;
	label?: string;
};

export type BookedInterval = {
	start: Date;
	end: Date;
	label: string;
};

export function parseLocalDate(iso: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
	if (!match) return null;
	const [, year, month, day] = match;
	return new Date(Number(year), Number(month) - 1, Number(day));
}

export function toBookedIntervals(ranges: BookedRange[]): BookedInterval[] {
	return ranges
		.map((range) => {
			const start = parseLocalDate(range.from);
			if (!start) return null;
			const end = parseLocalDate(range.to) ?? start;
			const [earliest, latest] = end < start ? [end, start] : [start, end];
			return {
				start: earliest,
				end: latest,
				label: range.label?.trim() || "Booked",
			};
		})
		.filter((interval): interval is BookedInterval => interval !== null);
}

export function stayOverlapsBooked(
	arrival: Date,
	departure: Date,
	intervals: BookedInterval[]
): boolean {
	return intervals.some(
		(interval) => arrival <= interval.end && departure >= interval.start
	);
}
