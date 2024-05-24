import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

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
			checkInTime: new Date().toLocaleString(),
		},
		{
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		}
	);
}

export function checkOut({}: {}) {
	return axios.post(
		`${baseUrl}/attendance/checkout`,
		{
			checkOutTime: new Date().toLocaleString(),
		},
		{
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		}
	);
}

export function breakUpdate(data: any) {
	return axios.patch(`${baseUrl}/attendance/break`, data, {
		headers: {
			Authorization: `Bearer ${token()}`,
		},
	});
}

export function useMyTodayAttendance() {
	return useQuery({
		queryKey: ["attendance", "today"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/me/today`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			}
		)
		.then((res) => res.data);
}

export function useGetSingleAttendance(id: string) {
	return useQuery({
		queryKey: ["attendance", id],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/attendance/${id}`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}
