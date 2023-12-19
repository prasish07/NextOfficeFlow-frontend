import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "@/constants/apis";
import { error } from "console";
import { getCookies } from "@/utils/cookies";

export interface getSingleDataProps {
	id: number | undefined;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface LoginResponse {
	message: string;
}

export interface userInfoProps {
	userId: string;
	role: string;
}

export function loginUser(data: LoginData): Promise<LoginResponse> {
	return axios
		.post(`${baseUrl}/user/login`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function useLoginUserData() {
	return useQuery<userInfoProps, Error>({
		queryKey: ["user", 1],
		queryFn: async () => {
			const token = getCookies("token");
			console.log(token);

			const { data } = await axios.get<userInfoProps>(`${baseUrl}/user/me`);
			return data;
		},
	});
}

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
