import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "@/components/model/Model";
import { addGitHubLink } from "@/query/project";
import { useGetRepoInfo } from "@/query/github";
import { GITHUB_USER } from "@/constants/consts";
import axios from "axios";

export interface LinkModelProps {
	showModel: boolean;
	handleClose: () => void;
	projectId: string;
}

const LinkModel = ({ showModel, handleClose, projectId }: LinkModelProps) => {
	const [githubRepo, setGithubRepo] = useState("");
	const queryClient = useQueryClient();

	const addGitHubMutation = useMutation({
		mutationFn: addGitHubLink,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["project details", projectId],
			});
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const { data, error, refetch, isFetching } = useGetRepoInfo(
		githubRepo,
		false
	);

	const handleSubmit = async () => {
		try {
			const regexPattern = new RegExp("/([^/]+)/?$");
			const match = githubRepo.match(regexPattern);

			if (!match) {
				toast.error("Repo name not found");
				return;
			}

			const result = await axios.get(
				`https://api.github.com/repos/${GITHUB_USER}/${match[1]}`,
				{
					headers: {
						Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
					},
				}
			);

			if (result) {
				addGitHubMutation.mutate({
					endpoint: projectId,
					repo: match[1],
				});
			}
		} catch (err) {
			// If there's an error (e.g., repo not found), display an error message
			toast.error("Invalid GitHub repository");
		}
	};

	return (
		<Modal
			size="lg"
			shouldShowModal={showModel}
			handleClose={handleClose}
			header={<h2>Link to Project {projectId}</h2>}
		>
			<div className="github__link">
				<input
					type="text"
					placeholder="Copy the link here..."
					className="github__link__input"
					onChange={(e) => {
						setGithubRepo(e.target.value);
					}}
				/>
				<button
					className="github__link-btn"
					onClick={handleSubmit}
					disabled={isFetching} // Disable button while fetching
				>
					{isFetching ? "Checking..." : "Link"}
				</button>
			</div>
		</Modal>
	);
};

export default LinkModel;
