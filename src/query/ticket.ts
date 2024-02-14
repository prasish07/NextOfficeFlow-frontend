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
