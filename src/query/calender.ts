import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function addEvent(data: any) {
	return axios
		.post(`${baseUrl}/event`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useGetEvents(filter?: { start: string; end: string }) {
	return useQuery({
		queryKey: ["events", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/events`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetEventsWithoutFilter(filter?: {
	start: string;
	end: string;
}) {
	return useQuery({
		queryKey: ["events", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/events`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function deleteEvent(id: string) {
	return axios
		.delete(`${baseUrl}/event/${id}`, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useUpcomingEvents() {
	return useQuery({
		queryKey: ["upcomingEvents"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/events/upcoming`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}
