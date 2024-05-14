import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function addAnnouncement(data: any) {
	return axios
		.post(`${baseUrl}/announcement/`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function useGetAnnouncement(filter?: any) {
	return useQuery({
		queryKey: ["announcement"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/announcement/`, {
				params: filter,
				withCredentials: true,
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
				withCredentials: true,
			});
			return data;
		},
	});
}

export function updateAnnouncement(data: any) {
	return axios
		.put(`${baseUrl}/announcement/${data.id}`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}

export function deleteAnnouncement(id: string | null) {
	return axios
		.delete(`${baseUrl}/announcement/${id}`, {
			withCredentials: true,
		})
		.then((res) => res.data);
}
