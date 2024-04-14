import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";

export function useGetProjectCount() {
	return useQuery({
		queryKey: ["project count", 1],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/project/counts`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetProjectList(filter?: any) {
	return useQuery({
		queryKey: ["project list"],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/project`, {
				params: filter,
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetProjectDetails({ endpoint }: { endpoint: string }) {
	return useQuery({
		queryKey: ["project details", endpoint],
		queryFn: async () => {
			const { data } = await axios.get(`${baseUrl}/project/${endpoint}`, {
				withCredentials: true,
			});
			return data;
		},
	});
}

export function useGetProjectComments({ endpoint }: { endpoint: string }) {
	return useQuery({
		queryKey: ["project comments", endpoint],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseUrl}/project/${endpoint}/comments`,
				{
					withCredentials: true,
				}
			);
			return data;
		},
	});
}

export function addCommentProject({
	field,
	endpoint,
	comment,
}: {
	field: string;
	endpoint: string;
	comment: string;
}) {
	return axios
		.post(
			`${baseUrl}/comment`,
			{ comment, [field]: endpoint },
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function useGetProjectAttachment({ endpoint }: { endpoint: string }) {
	return useQuery({
		queryKey: ["project attachment", endpoint],
		queryFn: async () => {
			const { data } = await axios.get(
				`${baseUrl}/project/${endpoint}/attachment`,
				{
					withCredentials: true,
				}
			);
			return data;
		},
	});
}
export function addAttachmentProject({
	endpoint,
	attachments,
}: {
	endpoint: string;
	attachments: string[];
}) {
	return axios
		.post(
			`${baseUrl}/project/attachment`,
			{ attachments, projectId: endpoint },
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function addProject(data: any) {
	return axios
		.post(`${baseUrl}/project`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function updateProject({ data, id }: { id: string; data: any }) {
	return axios
		.patch(`${baseUrl}/project/${id}`, data, { withCredentials: true })
		.then((res) => res.data);
}

export function deleteProject(id: string) {
	return axios
		.delete(`${baseUrl}/project/${id}`, { withCredentials: true })
		.then((res) => res.data);
}

export function addGitHubLink({
	endpoint,
	repo,
}: {
	endpoint: string;
	repo: string;
}) {
	return axios
		.patch(
			`${baseUrl}/project/${endpoint}/github`,
			{ githubRepo: repo },
			{ withCredentials: true }
		)
		.then((res) => res.data);
}

export function createAndAddGithubLink({
	endpoint,
	data,
}: {
	endpoint: string;
	data: any;
}) {
	return axios
		.put(`${baseUrl}/project/${endpoint}/github`, data, {
			withCredentials: true,
		})
		.then((res) => res.data);
}
