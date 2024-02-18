import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function checkIn({
	type,
	location,
	data,
}: {
	type: string;
	location: string;
	data: any;
}) {
	return axios.post(
		`${baseUrl}/attendance/checkin`,
		{
			type,
			location,
			lat: data.lat,
			lng: data.lng,
		},
		{ withCredentials: true }
	);
}

export function checkOut({}: {}) {
	return axios.post(
		`${baseUrl}/attendance/checkout`,
		{},
		{
			withCredentials: true,
		}
	);
}

export function useMyTodayAttendance() {
	return useQuery({
		queryKey: ["attendance", "today"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/me/today`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetAllAttendance() {
	return useQuery({
		queryKey: ["attendance", "all"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/all`, {
				withCredentials: true,
			});
			return data;
		},
	});
}
