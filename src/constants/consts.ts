import { getCookies } from "@/utils/cookies";

export const MIN_TABLET_VIEW_WIDTH = 900;
export const MIN_DESKTOP_VIEW_WIDTH = 1200;
export const COMPANY_LOCATION = {
	lat: 27.677935,
	lng: 85.375648,
};
export const API = "f82bd37718824e7a9ace5a7916b46fa4";
export const GITHUB_USER = "prasish07";
export const token = () => {
	return getCookies("token") as string;
};
