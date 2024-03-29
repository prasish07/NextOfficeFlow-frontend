import React, { useState } from "react";
import { LinkModelProps } from "./LinkModel";
import { Modal } from "@/components/model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndAddGithubLink } from "@/query/project";
import { toast } from "react-toastify";

const CreateRepoModel = ({
	showModel,
	handleClose,
	projectId,
}: LinkModelProps) => {
	const [isReadme, setIsReadme] = useState(false);
	const [repoData, setRepoData] = useState({
		name: "",
		description: "",
		isPrivate: false,
		readmeContent: "",
	});
	const queryClient = useQueryClient();

	const createAndLinkMutation = useMutation({
		mutationFn: createAndAddGithubLink,
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

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setRepoData({ ...repoData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createAndLinkMutation.mutate({
			endpoint: projectId,
			data: { ...repoData, isReadme },
		});
	};

	return (
		<Modal
			size="lg"
			shouldShowModal={showModel}
			handleClose={handleClose}
			header={<h2>Create Repo and link Project {projectId}</h2>}
		>
			<div className="github__link">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Enter repo name"
						className="github__link__input"
						name="name"
						value={repoData.name}
						onChange={handleChange}
					/>

					<textarea
						placeholder="Enter description"
						name="description"
						rows={5}
						className="github__link__textarea"
						value={repoData.description}
						onChange={handleChange}
					/>

					<div className="flex items-center gap-4 mt-2">
						<input
							type="checkbox"
							className=""
							name="private"
							id="private"
							checked={repoData.isPrivate}
							onClick={() => {
								setRepoData({ ...repoData, isPrivate: !repoData.isPrivate });
							}}
						/>
						<label htmlFor="private">Private</label>
					</div>

					<div className="flex items-center gap-4 mt-2">
						<input
							type="checkbox"
							className=""
							name="readme"
							id="readme"
							checked={isReadme}
							onClick={() => {
								setIsReadme(!isReadme);
							}}
						/>
						<label htmlFor="readme">Add readme</label>
					</div>

					{isReadme && (
						<>
							<hr className="mt-5 mb-2" />
							<textarea
								placeholder="Enter readme content"
								rows={5}
								name="readmeContent"
								className="github__link__textarea"
								value={repoData.readmeContent}
								onChange={handleChange}
							/>
						</>
					)}
					<button className="github__link-btn" type="submit">
						Create Repo and Link to Project
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default CreateRepoModel;
