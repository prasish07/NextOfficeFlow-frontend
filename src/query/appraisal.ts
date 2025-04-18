import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function useGetEmployeePerformanceData(filter: any) {
	return useQuery({
		queryKey: ["appraisal", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/appraisal/measures`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

interface Props {
	selectedId: string;
	data: {
		newPosition?: string;
		newSalary?: number;
		feedback: string;
		pastSalary?: number;
		pastPosition?: string;
	};
}

export function promoteEmployee({ selectedId, data }: Props) {
	return axios
		.post(`${baseUrl}/appraisal/promote/${selectedId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function increaseSalary({ selectedId, data }: Props) {
	return axios
		.post(`${baseUrl}/appraisal/increase-salary/${selectedId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function addFeedback({ selectedId, data }: Props) {
	return axios
		.post(`${baseUrl}/appraisal/feedback/${selectedId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useGetAllAppraisalHistory(filter?: any) {
	return useQuery({
		queryKey: ["appraisal", filter],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/appraisal/history/all`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetMyAppraisalHistory() {
	return useQuery({
		queryKey: ["appraisal", "my"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/appraisal/history/my`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetAppraisal(selectedId: string) {
	return useQuery({
		queryKey: ["appraisal", selectedId],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/appraisal/${selectedId}`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}
