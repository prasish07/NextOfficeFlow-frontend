import { addCommentProject, useGetProjectComments } from "@/query/project";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Comments = ({ endpoint }: { endpoint: string }) => {
	const [addComment, setAddComment] = React.useState<string>("");

	const { data, isLoading } = useGetProjectComments({ endpoint });
	const queryClient = useQueryClient();

	const commentMutation = useMutation({
		mutationFn: addCommentProject,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setAddComment("");
			queryClient.invalidateQueries({
				queryKey: ["project comments", endpoint],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) {
		return <div className="loader" />;
	}

	// if (!data) {
	// 	return <div>Error</div>;
	// }

	const { comments } = data || { comments: [] };

	return (
		<div className="project-id__comments">
			<div className="project-id__comments--header">
				<h3>Comments</h3>
			</div>
			<div className="project-id__comments--other-comments">
				{comments.map((comment: any) => {
					return (
						<div
							className="project-id__comments--other-comments-item"
							key={comment?._id}
						>
							<div>
								<span
									className="w-[30px] h-[30px] rounded-[50%] bg-[#d2d2ec] text-[#5a4e4e] flex justify-center items-center font-bold cursor-default capitalize"
									title={comment?.userId.email}
								>
									{comment?.userId.email[0]}
								</span>
							</div>
							<p>{comment?.comment}</p>
						</div>
					);
				})}
			</div>
			<div className="project-id__comments--add-comment">
				<div>
					<h3>Add your comment:</h3>
				</div>
				<textarea
					placeholder="Add Comment"
					rows={5}
					cols={50}
					value={addComment}
					onChange={(e) => {
						setAddComment(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						commentMutation.mutate({
							endpoint,
							comment: addComment,
							field: "projectId",
						});
					}}
				>
					Add comment
				</button>
			</div>
		</div>
	);
};

export default Comments;
