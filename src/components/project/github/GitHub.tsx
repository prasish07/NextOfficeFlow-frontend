import { useGetProjectDetails } from "@/query/project";
import React, { useState } from "react";
import LinkModel from "./LinkModel";
import CreateRepoModel from "./CreateRepoModel";

const GitHub = ({ endpoint }: { endpoint: string }) => {
	const { data, isLoading, isError } = useGetProjectDetails({ endpoint });
	const [showModel, setShowModel] = useState(false);
	const [showCreateModel, setShowCreateModel] = useState(false);

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	const { project } = data;

	if (!project.githubRepo) {
		return (
			<div className="github">
				<button
					className="github__link-btn"
					onClick={() => {
						setShowModel(true);
					}}
				>
					Linked Project to GitHub
				</button>
				<div className="or__container mt-5">
					<div className="or__line"></div>
					<div className="or__text">or</div>
					<div className="or__line"></div>
				</div>
				<button
					className="github__link-btn mt-5"
					onClick={() => {
						setShowCreateModel(true);
					}}
				>
					Create a new GitHub Repository and Link it here
				</button>
				<LinkModel
					showModel={showModel}
					handleClose={() => setShowModel(false)}
					projectId={endpoint}
				/>
				<CreateRepoModel
					showModel={showCreateModel}
					handleClose={() => setShowCreateModel(false)}
					projectId={endpoint}
				/>
			</div>
		);
	}

	return <div>Github</div>;
};

export default GitHub;
