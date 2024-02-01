import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "@/constants/apis";

export interface getSingleDataProps {
	id: number | undefined;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface LoginResponse {
	message: string;
	userId: string;
	role: string;
}

export interface userInfoProps {
	user: {
		userId: string;
		role: string;
	};
}

export function loginUser(data: LoginData): Promise<LoginResponse> {
	return axios
		.post(`${baseUrl}/user/login`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function googleLoginUser(data: {
	tokens: string;
}): Promise<LoginResponse> {
	return axios
		.post(`${baseUrl}/oauth/google`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function useLoginUserData() {
	return useQuery<userInfoProps>({
		queryKey: ["user", 1],
		queryFn: async () => {
			const { data } = await axios.get<userInfoProps>(`${baseUrl}/user/info`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

// export function Logout(): Promise<ResponseProps> {
// 	return axios
// 		.post(`${baseUrl}/user/logout`, { withCredentials: true })
// 		.then((res) => res.data);
// }

// export function useGetBanner({ id }: getSingleDataProps) {
// 	return useQuery<Banner, Error>({
// 		queryKey: ["banner", id],
// 		queryFn: async () => {
// 			const { data } = await axios.get<Banner>(
// 				`${baseUrl}/banner/${id}?fields=*.*.*&filter[status][_eq]=published`
// 			);
// 			return data;
// 		},
// 	});
// }
