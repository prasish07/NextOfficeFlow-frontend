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

export function useGetAllAttendance(filter?: any) {
	return useQuery({
		queryKey: ["attendance", "all"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/all`, {
				withCredentials: true,
				params: filter,
			});
			return data;
		},
	});
}

export function useGetMyTodayAttendance() {
	return useQuery({
		queryKey: ["attendance", "today"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/employee`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetTotalTodayAttendance() {
	return useQuery({
		queryKey: ["attendance", "total"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/today/total`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetUnCheckEmployees() {
	return useQuery({
		queryKey: ["attendance", "unchecked"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/today/uncheck`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function manualAttendance(data: any) {
	return axios
		.post(
			`${baseUrl}/attendance/manual`,
			{ data },
			{
				withCredentials: true,
			}
		)
		.then((res) => res.data);
}

export function updateAttendance(data: any) {
	return axios
		.patch(
			`${baseUrl}/attendance/manual/${data.id}`,
			{ data },
			{
				withCredentials: true,
			}
		)
		.then((res) => res.data);
}

export function useGetSingleAttendance(id: string) {
	return useQuery({
		queryKey: ["attendance", id],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/${id}`, {
				withCredentials: true,
			});
			return data;
		},
	});
}
