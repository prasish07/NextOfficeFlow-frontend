export const dateFormatter = (date: string) => {
	return date.split("T")[0];
};

export const timeFormatter = (date: string) => {
	return date.split("T")[1].split(".")[0];
};

export const dateWordFormatter = (date: string) => {
	return new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

export const formattedDateTime = (date: string) => {
	return new Date().toLocaleString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

export const TimeFormatterDate = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};
