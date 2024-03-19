import React, { useState } from "react";
import { Modal } from "../model/Model";
import Dropzone from "../Dropzone";
import CustomProject from "../dropdown/customProject";
import CustomeAssignee2 from "../dropdown/customAsignee2";
import { useTicketProvider } from "@/context/ticketProvider";

interface employeeProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
	ticketId?: string;
}

const TicketModal = () => {
	const { showModal, setShowModal, type } = useTicketProvider();
	const [images, setImages] = useState([""]);
	const currentDateTime = new Date();
	const [projectId, setProjectId] = useState<string>("");
	const [ticketDetails, setTicketDetails] = useState<any>({});
	const [assigneeId, setAssigneeId] = useState<string>("");

	const formattedDateTime = currentDateTime.toLocaleString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTicketDetails({ ...ticketDetails, [e.target.name]: e.target.value });
	};

	return (
		<Modal
			size="xlg"
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			header={`${type === "add" ? "New" : "Update"} Ticket`}
		>
			<div className="ticket__modal">
				<h3>{type !== "add" && 5002}</h3>
				<input
					name="title"
					id="title"
					placeholder="Add a title"
					value="Quick Fix Bug in the software"
					className="ticket__modal-title"
				/>

				<select>
					<option>Open</option>
					<option>Close</option>
					<option>Reopen</option>
					<option>Canceled</option>
				</select>
				<div className="flex flex-col gap-4">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						placeholder="Add a description"
						cols={30}
						rows={10}
					></textarea>
				</div>
				<div className="ticket__dropzone">
					<h3 className="font-bold">Attachments</h3>
					<Dropzone
						className="p-16 mt-10 border border-neutral-200"
						setImages={setImages}
					/>
				</div>

				<div className="ticket__modal-details">
					<h2>Details</h2>
					<div className="ticket__modal-details--info">
						<div>
							<label htmlFor="assignee">Assignee</label>
							{
								<CustomeAssignee2 setProjectId={setAssigneeId}>
									<button className="py-2 px-8 border-solid border border-[#ddd] rounded-[5px]">
										{assigneeId ? assigneeId : "Add"}
									</button>
								</CustomeAssignee2>
							}
						</div>
						<div>
							<label htmlFor="priority">Priority</label>
							<select
								name="priority"
								id="priority"
								// defaultValue={ticket.priority}
								// onChange={handlePriorityChange}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<div>
							<label htmlFor="due-date">Due Date</label>
							<input type="date" name="due-date" id="due-date" />
						</div>
						<div>
							<label htmlFor="requiredTime">Required Time</label>
							<span>
								<input type="number" name="time" id="time" /> Hours
							</span>
						</div>
						<div>
							<label htmlFor="Reporter">Reporter</label>
							<p className="capitalize">
								{type === "add" ? "Myself" : "reporter"}
							</p>
						</div>
						<div>
							<label htmlFor="createdAt">Created At</label>
							<p>{type === "add" ? formattedDateTime : "sdf"}</p>
						</div>
						<div>
							<label htmlFor="linkProject">Link Project Id</label>
							{
								<CustomProject setProjectId={setProjectId}>
									<button className="py-2 px-8 border-solid border border-[#ddd] rounded-[5px]">
										{projectId ? projectId : "Add"}
									</button>
								</CustomProject>
							}
						</div>
					</div>
				</div>
				<div className="w-full flex justify-end">
					<button className="w-full py-3 bg-[#3498db] font-bold text-white rounded-[5px]">
						Save
					</button>
				</div>
				<div className="ticket__modal-details">
					<h2>Comments</h2>
					<div className="ticket__comments--other-comments">
						{/* {comments.map((comment: any) => {
							return ( */}
						<div
							className="ticket__comments--other-comments-item"
							// key={comment._id}
						>
							<div>
								<span
									className="w-[30px] h-[30px] rounded-[50%] bg-[#d2d2ec] text-[#5a4e4e] flex justify-center items-center font-bold cursor-default capitalize"
									// title={comment.UserId.email}
								>
									{/* {comment.UserId.email[0]} */}s
								</span>
							</div>
							{/* <p>{comment.comment}</p> */}
							<p>Prasish Shrestha</p>
						</div>
						{/* ); */}
						{/* })} */}
					</div>
					<div className="ticket__comments--add-comment">
						<div>
							<h3>Add your comment:</h3>
						</div>
						<textarea
							placeholder="Add Comment"
							rows={5}
							cols={50}
							// value={addComment}
							onChange={(e) => {
								// setAddComment(e.target.value);
							}}
						/>
						<button
							onClick={() => {
								// commentMutation.mutate({ endpoint, comment: addComment });
							}}
						>
							Add comment
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TicketModal;
