import { useGetProjectDetails } from "@/query/project";
import React, { useState } from "react";
import LinkModel from "./LinkModel";
import CreateRepoModel from "./CreateRepoModel";
import classNames from "classnames";
import Info from "./Info";
import Commits from "./Commits";
import PR from "./PR";
import { useGlobalProvider } from "@/context/GlobalProvicer";

const GitHub = ({ endpoint }: { endpoint: string }) => {
	const { data, isLoading, isError } = useGetProjectDetails({ endpoint });
	const [showModel, setShowModel] = useState(false);
	const [showCreateModel, setShowCreateModel] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Info");
	const { role } = useGlobalProvider();

	const isEmployee = role === "employee";

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	const { project } = data;

	if (isEmployee && !project.githubRepo) {
		return (
			<div className="github m-[20px] bg-white p-[10px] font-bold h-fit rounded-[10px]">
				No GitHub has been link to this project yet by project manager
			</div>
		);
	}

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

	const GithubFilter = () => {
		return (
			<div className="ticket__filter-status mt-5 rounded-[10px]">
				<button
					onClick={() => {
						setSelectedOption("Info");
					}}
					className={classNames({ active: selectedOption === "Info" })}
				>
					Info
				</button>
				<button
					onClick={() => setSelectedOption("Commits")}
					className={classNames({ active: selectedOption === "Commits" })}
				>
					Commits
				</button>
				<button
					onClick={() => setSelectedOption("Pull Request")}
					className={classNames({
						active: selectedOption === "Pull Request",
					})}
				>
					Pull Request
				</button>
				{/* <button
					onClick={() => setSelectedOption("Issues")}
					className={classNames({
						active: selectedOption === "Issues",
					})}
				>
					Issues
				</button>
				<button
					onClick={() => setSelectedOption("Insights")}
					className={classNames({
						active: selectedOption === "Insights",
					})}
				>
					Insights
				</button> */}
			</div>
		);
	};

	const githubFilterElement = () => {
		switch (selectedOption) {
			case "Info":
				return <Info repo={project?.githubRepo} />;

			case "Commits":
				return <Commits repo={project?.githubRepo} />;

			case "Pull Request":
				return <PR repo={project?.githubRepo} />;

			default:
				break;
		}
	};

	return (
		<div className="github">
			<GithubFilter />
			{githubFilterElement()}
		</div>
	);
};

export default GitHub;
