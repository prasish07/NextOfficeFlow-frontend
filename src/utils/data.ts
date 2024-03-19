export const dateFormatter = (date: string) => {
	return date.split("T")[0];
};

export const dateWordFormatter = (date: string) => {
	return new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};
