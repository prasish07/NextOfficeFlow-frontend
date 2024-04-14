import React, { useState } from "react";
import { useGetRepoCommits } from "@/query/github";
import Link from "next/link";

const PAGE_SIZE = 5;

const Commits = ({ repo }: { repo: string }) => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, refetch, isFetching } = useGetRepoCommits(
		repo,
		page,
		PAGE_SIZE
	);

	const { data: totalPages, isLoading: totalPageLoading } =
		useGetRepoCommits(repo);

	let commits: any = [];

	if ((isLoading && page === 1) || isFetching || totalPageLoading)
		return <div className="loader" />;

	if (isError)
		return (
			<div className="bg-white p-[10px] rounded-sm mt-4">No Commits Found</div>
		);

	const totalPagesCount = Math.ceil(totalPages.length / PAGE_SIZE);

	const getPageButtons = () => {
		const currentPage = page;
		const totalPageButtons = 5;
		const halfTotalPageButtons = Math.floor(totalPageButtons / 2);
		const firstPage = Math.max(1, currentPage - halfTotalPageButtons);
		const lastPage = Math.min(
			totalPagesCount,
			firstPage + totalPageButtons - 1
		);

		const pageButtons = [];
		for (let i = firstPage; i <= lastPage; i++) {
			pageButtons.push(
				<button
					key={i}
					className={`mx-1 ${
						i === currentPage
							? "bg-blue-700 text-white"
							: "bg-white text-blue-500"
					} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`}
					onClick={() => setPage(i)}
				>
					{i}
				</button>
			);
		}

		if (firstPage > 1) {
			pageButtons.unshift(
				<button
					key="prev-ellipsis"
					className="mx-1 bg-white text-blue-500 font-bold py-2 px-4 rounded"
					disabled
				>
					...
				</button>
			);
		}

		if (lastPage < totalPagesCount) {
			pageButtons.push(
				<button
					key="next-ellipsis"
					className="mx-1 bg-white text-blue-500 font-bold py-2 px-4 rounded"
					disabled
				>
					...
				</button>
			);
		}

		return pageButtons;
	};

	return (
		<div className="github__commits">
			<h2>Commits History</h2>
			<div className="github__commits__container">
				{data.map((commit: any) => (
					<Link
						href={commit.html_url}
						className="github__commits__element"
						key={commit.sha}
					>
						<div className="right">
							<h3>{commit.commit.message}</h3>
							<p>
								Author: {commit.commit.author.name} : (
								{commit.commit.author.email})
							</p>
						</div>
						<p>Commit on {commit.commit.author.date}</p>
					</Link>
				))}
				{isFetching && <div>Loading more...</div>}
			</div>
			<div className="flex gap-2 justify-center mt-4">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
				>
					Previous
				</button>
				<div className="flex">{getPageButtons()}</div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => setPage(page + 1)}
					disabled={page === totalPagesCount}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Commits;
