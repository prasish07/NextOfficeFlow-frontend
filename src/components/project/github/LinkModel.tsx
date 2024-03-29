import { Modal } from "@/components/model/Model";
import { addGitHubLink } from "@/query/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

	const handleSubmit = () => {
		addGitHubMutation.mutate({ endpoint: projectId, repo: githubRepo });
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
					value={githubRepo}
					onChange={(e) => setGithubRepo(e.target.value)}
				/>
				<button className="github__link-btn" onClick={handleSubmit}>
					Link
				</button>
			</div>
		</Modal>
	);
};

export default LinkModel;
