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
	});
}

export function useGetNotificationCount() {
	return useQuery({
		queryKey: ["notificationCount"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/notifications/count`, {
				withCredentials: true,
			});
			return data;
		},
	});
}
