import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function useGetNotification(filter?: any) {
	return useQuery({
		queryKey: ["notification", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/notifications`, {
				params: filter,
				withCredentials: true,
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
				withCredentials: true,
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
		{ withCredentials: true }
	);
}

export function updateAllNotificationStatus() {
	return axios.patch(
		`${baseUrl}/notifications/all`,
		{ isSeen: true },
		{ withCredentials: true }
	);
}
