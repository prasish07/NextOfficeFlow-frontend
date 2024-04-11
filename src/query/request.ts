import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function addLeaveRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function addAllowanceRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function addOverTimeRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function addAttendanceRequest(data: any) {
	return axios
		.post(`${baseUrl}/request`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function useGetAllRequests(filter?: any) {
	return useQuery({
		queryKey: ["requests", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/requests`, {
				params: filter,
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetAllRequestOfUser(filter?: any) {
	return useQuery({
		queryKey: ["request", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/request`, {
				params: filter,
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetAllPMRequested(filter?: any) {
	return useQuery({
		queryKey: ["request", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/request/pm/request`, {
				params: filter,
				withCredentials: true,
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
				withCredentials: true,
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
		.patch(`${baseUrl}/request/${requestId}`, data, { withCredentials: true })
		.then((res) => res.data);
}
