import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function addAnnouncement(data: any) {
	return axios
		.post(`${baseUrl}/announcement/`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function useGetAnnouncement(filter?: any) {
	return useQuery({
		queryKey: ["announcement"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/announcement/`, {
				params: filter,
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function useGetSingleAnnouncement(id: string | null) {
	return useQuery({
		queryKey: ["single announcement", id],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/announcement/${id}`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function updateAnnouncement(data: any) {
	return axios
		.put(`${baseUrl}/announcement/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function deleteAnnouncement(id: string | null) {
	return axios
		.delete(`${baseUrl}/announcement/${id}`, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}
