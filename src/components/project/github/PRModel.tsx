import { Modal } from "@/components/model/Model";
import {
	addPRComments,
	useGetGetPRComments,
	useGetPRReview,
	useGetSinglePR,
} from "@/query/github";
import { formattedDateTime } from "@/utils/data";
import React, { LegacyRef, useRef } from "react";
import CodeBlock from "./CodeBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface PRModelProps {
	showModel: boolean;
	handleClose: () => void;
	id: string;
	repo: string;
}

const PRModel = ({ showModel, handleClose, id, repo }: PRModelProps) => {
	const { data, isLoading, isError } = useGetSinglePR(repo, id);
	const {
		data: prDataReview,
		isLoading: prLoadingReview,
		isError: prErrorReview,
	} = useGetPRReview(repo, id);

	const comment = useRef<any>("");
	const queryClient = useQueryClient();

	const {
		data: comments,
		isLoading: commentsLoading,
		isError: commentsError,
	} = useGetGetPRComments(repo, id);

	// if (isLoading || prLoadingReview || commentsLoading)
	// 	return <div className="loader" />;

	const addCommentMutation = useMutation({
		mutationFn: addPRComments,
		onError: (error: any) => {
			toast.error("Error adding comment");
		},
		onSuccess: (data: any) => {
			toast.success("Comment added");
			queryClient.invalidateQueries({ queryKey: ["repo pr review", repo, id] });
			queryClient.invalidateQueries({
				queryKey: ["repo pr comments", repo, id],
			});
			comment.current!.value = "";
		},
	});

	if (isError || !data || prErrorReview || commentsError) return <></>;

	const addComment = (comment: string) => {
		addCommentMutation.mutate({
			repo,
			id,
			comment,
		});
	};

	return (
		<Modal
			shouldShowModal={showModel}
			handleClose={handleClose}
			header={<h2 className="capitalize">{data.title}</h2>}
			size="lg"
		>
			<div className="github__pr-model">
				<div className="title">
					<p className="status">{data.state}</p>
					<p className="box">
						{data.user.login} wants to merge {data.head.ref} to {data.base.ref}
					</p>
					<p className="box">
						Created At: {data && formattedDateTime(data.created_at)}{" "}
					</p>
				</div>
				<div className="content">
					<h3>Description : </h3>
					<p className="box">{data?.body}</p>
				</div>
				<p className="box">
					Total comments:{" "}
					<span className="text-black text-[18px] font-bold">
						{data?.comments}
					</span>
				</p>
				<p className="box">
					Total commits:{" "}
					<span className="text-black text-[18px] font-bold">
						{data?.commits}
					</span>
				</p>
				<p className="box">
					Total files changed:{" "}
					<span className="text-black text-[18px] font-bold">
						{data?.changed_files}
					</span>
				</p>
				<div className="flex gap-2 items-center">
					<h3>Reviews :</h3>
					{prDataReview?.length ? (
						prDataReview.map((review: any) => (
							<div
								key={review.id}
								className="flex items-center mt-2 gap-x-6 box"
							>
								<p>{review.user.login}</p> |
								<p className="font-bold text-black">{review?.state}</p>
							</div>
						))
					) : (
						<p className="flex items-center mt-2 gap-x-6 box">No reviews</p>
					)}
				</div>

				{comments?.length ? (
					<div>
						<h3>Comments</h3>
						{comments.map((comment: any) => (
							<div
								key={comment.id}
								className="flex items-center mt-2 gap-x-6 box"
							>
								<p>{comment.user.login}</p> |<p>{comment.body}</p>
							</div>
						))}
					</div>
				) : (
					<p className="flex items-center mt-2 gap-x-6 box">No comments</p>
				)}
				<div className="flex flex-col gap-2">
					<h3>Write comment</h3>
					<textarea placeholder="Write your comment" rows={4} ref={comment} />
					<button
						className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
						onClick={() => {
							addComment(comment.current?.value ? comment.current?.value : "");
						}}
					>
						Comment
					</button>
				</div>

				<div className="flex flex-col gap-2">
					<h3>View file changes</h3>
					<CodeBlock link={data?._links.html.href + "/files"} />
				</div>
			</div>
		</Modal>
	);
};

export default PRModel;
