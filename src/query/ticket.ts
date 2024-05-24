import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { token } from "@/constants/consts";

export function useGetTicketList(filter?: any) {
	return useQuery({
		queryKey: ["ticket list"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/ticket`, {
				headers: {
					Authorization: `Bearer ${token()}`,
				},
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
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			});
			return data;
		},
	});
}

export function addTicket(data: any) {
	return axios
		.post(`${baseUrl}/ticket`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
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
			{
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			}
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
			{
				headers: {
					Authorization: `Bearer ${token()}`,
				},
			}
		)
		.then((res) => res.data);
}

export function deleteTicket({ ticketId }: { ticketId: string }) {
	return axios
		.delete(`${baseUrl}/ticket/${ticketId}`, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function updateTicket(data: any) {
	return axios
		.patch(`${baseUrl}/ticket/${data.selectedId}`, data, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}

export function removeTickets(ticketList: string[]) {
	return axios
		.post(`${baseUrl}/ticket/removeMany`, ticketList, {
			headers: {
				Authorization: `Bearer ${token()}`,
			},
		})
		.then((res) => res.data);
}
