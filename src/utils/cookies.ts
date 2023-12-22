import Cookies from "js-cookie";

export const getCookies = (value: string) => {
	return Cookies.get(value);
};

export const setCookies = (name: string, value: string, days: number) => {
	Cookies.set(name, value, { expires: days });
};

export const removeCookie = (name: string) => {
	Cookies.remove(name);
};
