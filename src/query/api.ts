import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

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
	verified: boolean;
	isFirstTimePasswordChange: boolean;
	token: string;
}

export interface userInfoProps {
	user: {
		userId: string;
		role: string;
	};
}

export function loginUser(data: LoginData): Promise<LoginResponse> {
	return axios
		.post(`${baseUrl}/user/login`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function googleLoginUser(data: {
	tokens: string;
}): Promise<LoginResponse> {
	return axios
		.post(`${baseUrl}/oauth/google`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useLoginUserData(id: string) {
	return useQuery<any>({
		queryKey: ["user", id],
		queryFn: async () => {
			const { data } = await axios.get<userInfoProps>(`${baseUrl}/user/info`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
		retry: false,
	});
}

export function verifyAccount(data: { id: string; pin: string }) {
	return axios
		.post(`${baseUrl}/user/verification`, data)
		.then((res) => res.data);
}

export function changePassword(data: {
	password: string;
	newPassword: string;
}) {
	return axios
		.post(`${baseUrl}/user/changePassword`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function verifyPasswordPin(data: { id: string; pin: string }) {
	return axios
		.post(`${baseUrl}/user/resetPassword/verify`, data)
		.then((res) => res.data);
}

export function resetPassword(data: any) {
	return axios
		.post(`${baseUrl}/user/resetPassword`, data)
		.then((res) => res.data);
}

export function forgetPassword(email: string) {
	return axios
		.post(`${baseUrl}/user/sentCode/resetPassword`, { email })
		.then((res) => res.data);
}
