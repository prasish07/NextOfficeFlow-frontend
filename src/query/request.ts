import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function addLeaveRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function addAllowanceRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function addOverTimeRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function addAttendanceRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useGetAllRequests(filter?: any) {
	return useQuery({
		queryKey: ["requests"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/requests`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetAllRequestOfUser(filter?: any) {
	return useQuery({
		queryKey: ["request"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/request`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetAllPMRequested(filter?: any) {
	return useQuery({
		queryKey: ["request"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/request/pm/request`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetUserRequest(requestId: string) {
	return useQuery({
		queryKey: ["request", requestId],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/request/${requestId}`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function updateStatus({
	requestId,
	data,
}: {
	requestId: string;
	data: any;
}) {
	return axios
		.patch(`${baseUrl}/request/${requestId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function removeRequestFunc(id: string) {
	return axios
		.delete(`${baseUrl}/request/${id}`, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}
