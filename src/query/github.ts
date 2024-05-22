import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/apis";
import { GITHUB_USER } from "@/constants/consts";

export function useGetRepoInfo(repo: string, enabled: boolean = true) {
	return useQuery({
		queryKey: ["repo info", repo],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
		enabled,
	});
}

export function useGetRepoCommits(
	repo: string,
	page?: number,
	pageSize?: number
) {
	return useQuery({
		queryKey: ["repo commits", repo, page],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/commits`,
				{
					params: {
						page,
						per_page: pageSize,
					},

					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
		retry: false,
	});
}

export function useGetRepoPR(repo: string) {
	return useQuery({
		queryKey: ["repo pr", repo],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/pulls`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
	});
}

export function useGetMostUsedLanguage(repo: string) {
	return useQuery({
		queryKey: ["repo language", repo],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/languages`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
	});
}

export function useGetSinglePR(repo: string, id: string) {
	return useQuery({
		queryKey: ["repo single pr", repo, id],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/pulls/${id}`,
				// `https://api.github.com/repos/parewalabs/programiz-pro-marketing-website/pulls/2968`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
	});
}

export function useGetPRReview(repo: string, id: string) {
	return useQuery({
		queryKey: ["repo pr review", repo, id],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/pulls/${id}/reviews`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
	});
}

export function useGetGetPRComments(repo: string, id: string) {
	return useQuery({
		queryKey: ["repo pr comments", repo, id],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${repo}/issues/${id}/comments`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);
			return data;
		},
	});
}

export function addPRComments({
	repo,
	id,
	comment,
}: {
	repo: string;
	id: string;
	comment: string;
}) {
	return axios
		.post(
			`https://api.github.com/repos/${GITHUB_USER}/${repo}/issues/${id}/comments`,
			{
				body: comment,
			},
			{
				headers: {
					Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
				},
			}
		)
		.then((res) => res.data);
}
