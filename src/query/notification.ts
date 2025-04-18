import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function useGetNotification(filter?: any) {
	console.log(token);
	return useQuery({
		queryKey: ["notification", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/notifications`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
		staleTime: 10000,
		refetchInterval: 10000,
	});
}

export function useGetNotificationCount() {
	return useQuery({
		queryKey: ["notification"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/notifications/count`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
		staleTime: 10000,
		refetchInterval: 10000,
	});
}

export function updateNotificationStatus(notificationId: string) {
	return axios.patch(
		`${baseUrl}/notifications/${notificationId}`,
		{ isSeen: true },
		{
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		}
	);
}

export function updateAllNotificationStatus() {
	return axios.patch(
		`${baseUrl}/notifications/all`,
		{ isSeen: true },
		{
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		}
	);
}
