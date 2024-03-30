import React, { useState } from "react";
import PRModel from "./PRModel";
import { useGetRepoPR } from "@/query/github";
import { formattedDateTime } from "@/utils/data";

const PR = ({ repo }: { repo: string }) => {
	const [showModel, setShowModel] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const { data, isLoading, isError } = useGetRepoPR(repo);

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	return (
		<div className="github__pr">
			<h2>Pull Requests</h2>

			<div className="github__pr__elements">
				{/* <div
					className="github__pr__element"
					onClick={() => {
						setShowModel(true);
						setSelectedId("1");
					}}
				>
					<div>
						<h3>Update npm package</h3>
						<div className="flex gap-2 items-center">
							<p>Opened by: user1</p>|<p>Comments: 5</p>
						</div>
					</div>
					<div>
						<p>State: Open</p>
						<p>Opened on: 12/12/2021</p>
					</div>
				</div> */}
				{data.map((pr: any) => (
					<div
						className="github__pr__element"
						onClick={() => {
							setShowModel(true);
							setSelectedId(pr.number);
						}}
						key={pr.id}
					>
						<div>
							<h3>{pr.title}</h3>
							<div className="flex gap-2 items-center">
								<p>Opened by: {pr.user.login}</p>|<p>Comments: {pr.comments}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p>
								State:{" "}
								<span className="font-bold text-green-500 capitalize">
									{pr.state}
								</span>
							</p>
							<p>Opened on: {formattedDateTime(pr.created_at)}</p>
						</div>
					</div>
				))}
			</div>
			<PRModel
				showModel={showModel}
				handleClose={() => setShowModel(false)}
				id={selectedId}
				repo={repo}
			/>
		</div>
	);
};

export default PR;
