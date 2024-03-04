import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function useGetTicketList() {
	return useQuery({
		queryKey: ["ticket list", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/ticket`, {
				withCredentials: true,
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

export function updateAssignee({
	ticketId,
	assignee,
}: {
	ticketId: string;
	assignee: string;
}) {
	return axios.patch(
		`${baseUrl}/ticket/${ticketId}`,
		{
			assigneeId: assignee,
		},
		{ withCredentials: true }
	);
}

export function updateStatus({
	ticketId,
	status,
}: {
	ticketId: string;
	status: string;
}) {
	return axios.patch(
		`${baseUrl}/ticket/${ticketId}`,
		{
			status,
		},
		{ withCredentials: true }
	);
}

export function updatePriority({
	ticketId,
	priority,
}: {
	ticketId: string;
	priority: string;
}) {
	return axios.patch(
		`${baseUrl}/ticket/${ticketId}`,
		{
			priority,
		},
		{ withCredentials: true }
	);
}
