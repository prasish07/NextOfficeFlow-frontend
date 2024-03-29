import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function useGetTicketList(filter?: any) {
	return useQuery({
		queryKey: ["ticket list", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/ticket`, {
				withCredentials: true,
				params: filter,
			});
			return data;
		},
	});
}

export function useGetTicketById(ticketId: string) {
	return useQuery({
		queryKey: ["ticket", ticketId],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/ticket/${ticketId}`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function addTicket(data: any) {
	return axios
		.post(`${baseUrl}/ticket`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function addAttachmentTicket({
	endpoint,
	attachment,
}: {
	endpoint: string;
	attachment: string;
}) {
	return axios
		.post(
			`${baseUrl}/attachment`,
			{ attachment, ticketId: endpoint },
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function updateTicketOneField({
	ticketId,
	field,
	value,
}: {
	ticketId: string;
	field: string;
	value: string;
}) {
	return axios
		.patch(
			`${baseUrl}/ticket/${ticketId}`,
			{
				[field]: value,
			},
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function deleteTicket({ ticketId }: { ticketId: string }) {
	return axios
		.delete(`${baseUrl}/ticket/${ticketId}`, { withCredentials: true })
		.then((res) => res.data);
}

export function updateTicket(data: any) {
	return axios
		.patch(`${baseUrl}/ticket/${data.selectedId}`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}
