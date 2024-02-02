import React from "react";

const Comments = () => {
	return (
		<div className="project-id__comments">
			<div className="project-id__comments--header">
				<h3>Comments</h3>
			</div>
			<div className="project-id__comments--other-comments">
				<div className="project-id__comments--other-comments-item">
					<div>
						<h3>John Doe</h3>
					</div>
					<p>Comment 1</p>
				</div>
			</div>
			<div className="project-id__comments--add-comment">
				<div>
					<h3>Prasish Shrestha</h3>
				</div>
				<textarea placeholder="Add Comment" rows={5} cols={50}></textarea>
				<button>Add comment</button>
			</div>
		</div>
	);
};

export default Comments;
