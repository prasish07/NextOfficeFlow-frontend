export const getCookies = (value: string) => {
	const cookies = document.cookie.split(";");
	const cookie = cookies.filter((cookie) => {
		return cookie.split("=")[0].trim() === value;
	});
	if (cookie.length > 0) {
		return cookie[0].split("=")[1];
	} else {
		return null;
	}
};

export const setCookies = (name: string, value: string, days: number) => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
};

export const removeCookie = (name: string) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
