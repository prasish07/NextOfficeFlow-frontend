import {
	useGetMostUsedLanguage,
	useGetRepoCommits,
	useGetRepoInfo,
	useGetRepoPR,
} from "@/query/github";
import React from "react";
import CodeBlock from "./CodeBlock";
import { FaHome } from "react-icons/fa";
import { IoGitCommit, IoGitPullRequest } from "react-icons/io5";
import { VscIssueReopened } from "react-icons/vsc";
import { GrLanguage } from "react-icons/gr";
import { getMostUsedLanguage } from "@/utils/data";

const Info = ({ repo }: { repo: string }) => {
	const { data, isLoading, isError } = useGetRepoInfo(repo);

	const { data: commit } = useGetRepoCommits(repo, 1, 100);

	const { data: pr } = useGetRepoPR(repo);

	const { data: language } = useGetMostUsedLanguage(repo);
	let mostUsedLanguage = language ? Object.keys(language)[0] : "Not Found";

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	mostUsedLanguage = getMostUsedLanguage(language) ?? "Not found";

	return (
		<div className="github__info">
			<h2>Repository Information</h2>
			<h3>Name: {data.name}</h3>
			<div className="flex flex-col gap-2">
				<h4>Repository Link:</h4>
				<CodeBlock link={data.html_url} />
			</div>
			{!!data.description && (
				<div className="flex flex-col gap-2">
					<h3>Description:</h3>
					<p>{data.description}</p>
				</div>
			)}
			<h3>Latest release: v2.0.0.1</h3>
			<div className="github__options">
				<div className="github__options-element">
					<IoGitCommit size={34} />
					<h3>Commits</h3>
					<p>{commit?.length ?? "0"}</p>
				</div>
				<div className="github__options-element">
					<IoGitPullRequest size={34} />
					<h3>Pull Requests</h3>
					<p>{pr?.length}</p>
				</div>
				<div className="github__options-element">
					<VscIssueReopened size={34} />
					<h3>Issues</h3>
					<p>{data.open_issues}</p>
				</div>
				<div className="github__options-element">
					<GrLanguage size={34} />
					<h3>Language</h3>
					<p style={{ fontSize: "20px" }}>{mostUsedLanguage}</p>
				</div>
			</div>
		</div>
	);
};

export default Info;
