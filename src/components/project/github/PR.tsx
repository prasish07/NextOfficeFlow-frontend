import React, { useState } from "react";
import PRModel from "./PRModel";
import { useGetRepoPR } from "@/query/github";
import { formattedDateTime } from "@/utils/data";

const PR = ({ repo }: { repo: string }) => {
	const [showModel, setShowModel] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const { data, isLoading, isError } = useGetRepoPR(repo);

	if (!data.length)
		return (
			<div className="bg-white p-[10px] rounded-[10px] mt-4 font-bold">
				No Pull Request Found
			</div>
		);

	return (
		<div className="github__pr">
			<div className="github__pr__elements">
				{data?.length ? (
					data.map((pr: any) => (
						<div
							className="github__pr__element"
							onClick={() => {
								setShowModel(true);
								setSelectedId(pr.number);
							}}
							key={pr.id}
						>
							<div>
								<h3 className="capitalize">{pr.title}</h3>
								<div className="flex gap-2 items-center">
									<p>Opened by: {pr.user.login}</p>|
									<p>Comments: {pr.comments}</p>
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
					))
				) : (
					<p className="font-bold">No Pull Requests Found</p>
				)}
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
