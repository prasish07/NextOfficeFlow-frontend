import React, { useEffect, useState } from "react";
import { Modal } from "../model/Model";
import Dropzone from "../Dropzone";
import CustomProject from "../dropdown/customProject";
import CustomeAssignee2 from "../dropdown/customAsignee2";
import { useTicketProvider } from "@/context/ticketProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addAttachmentTicket,
	addTicket,
	useGetTicketById,
} from "@/query/ticket";
import { toast } from "react-toastify";
import { addAttachmentProject } from "@/query/project";
import { dateFormatter, formattedDateTime } from "@/utils/data";
import ImageModel from "../ImageModel";

interface employeeProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
	ticketId?: string;
}

const TicketModal = () => {
	const { showModal, setShowModal, type, selectedId } = useTicketProvider();
	const [showImageModal, setShowImageModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const currentDateTime = new Date();
	const [projectId, setProjectId] = useState<string>("");
	const [ticketDetails, setTicketDetails] = useState<any>({
		title: "",
		status: "To-Do",
		description: "",
		priority: "Low",
		dueDate: "",
		requiredTime: "",
		createdAt: "",
		linkedProject: "",
		grade: 0,
		estimatedTime: "",
		spentTime: "",
	});
	const [assigneeId, setAssigneeId] = useState<string>("");
	const { data, isError } = useGetTicketById(selectedId);

	const queryClient = useQueryClient();

	const addTicketMutation = useMutation({
		mutationFn: addTicket,
		onSuccess: (data: any) => {
			// setShowModal(false);
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setTicketDetails({ ...ticketDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		addTicketMutation.mutate({
			...ticketDetails,
			createdAt: new Date(),
			attachments: images,
			linkedProject: projectId,
			assigneeId,
		});
	};

	useEffect(() => {
		if (type === "update") {
			if (isError || !data) return;
			const { ticket } = data ?? {};
			console.log(data);
			setTicketDetails({ ...ticket, dueDate: dateFormatter(ticket.dueDate) });
			setAssigneeId(ticket.assigneeId._id);
			setProjectId(ticket.linkedProject);
			setImages(() => {
				return ticket.attachments.map((attachment: any) => {
					return attachment.attachment;
				});
			});
		} else {
			setTicketDetails({
				title: "",
				status: "To-Do",
				description: "",
				priority: "Low",
				dueDate: "",
				requiredTime: "",
				createdAt: "",
				linkedProject: "",
				grade: 0,
				estimatedTime: "",
				spentTime: "",
			});
			setAssigneeId("");
			setProjectId("");
			setImages([]);
		}
	}, [data, type]);

	return (
		<Modal
			size="xlg"
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			header={`${type === "add" ? "New" : "Update"} Ticket`}
		>
			<div className="ticket__modal">
				<h3>{type !== "add" && data?.ticket?._id}</h3>
				<input
					name="title"
					id="title"
					placeholder="Add a title"
					value={ticketDetails.title}
					onChange={handleChange}
					className="ticket__modal-title"
				/>

				<select
					defaultValue={ticketDetails.status}
					name="status"
					id="status"
					onChange={handleChange}
				>
					<option value="To-Do">To-Do</option>
					<option value="In-Progress">In-Progress</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
					<option value="Reopen">Reopen</option>
				</select>
				<div className="flex flex-col gap-4">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						placeholder="Add a description"
						cols={30}
						rows={10}
						value={ticketDetails.description}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="ticket__dropzone">
					<h3 className="font-bold">Attachments</h3>
					<Dropzone
						className="p-16 mt-10 border border-neutral-200"
						setImages={setImages}
					/>
					<div className="project-id__attachment--upload-btn">
						<div className="flex flex-wrap gap-2">
							{images.length >= 1 &&
								images.map((image: any, index) => {
									// return <img src={image} alt="attachment" key={index} />;
									return (
										<img
											src={image}
											alt="attachment"
											key={index}
											onClick={() => {
												setSelectedImage(image);
												setShowImageModal(true);
											}}
										/>
									);
								})}
						</div>
					</div>
				</div>

				<div className="ticket__modal-details">
					<h2>Details</h2>
					<div className="ticket__modal-details--info">
						<div>
							<label htmlFor="assignee">Assignee</label>
							{
								<CustomeAssignee2 setProjectId={setAssigneeId}>
									<button className="p-[10px] border-solid border border-[#ddd] rounded-[5px] text-[18px]">
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
								defaultValue={ticketDetails.priority}
								onChange={handleChange}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<div>
							<label htmlFor="due-date">Due Date</label>
							<input
								type="date"
								name="dueDate"
								value={ticketDetails.dueDate}
								onChange={handleChange}
								id="due-date"
							/>
						</div>
						<div>
							<label htmlFor="requiredTime">Required Time</label>
							<span>
								<input
									type="number"
									name="estimatedTime"
									id="time"
									value={ticketDetails.estimatedTime}
									onChange={handleChange}
								/>{" "}
								Hours
							</span>
						</div>
						<div>
							<label htmlFor="Reporter">Reporter</label>
							<p className="capitalize">
								{type === "add" ? "Myself" : data?.ticket?.reporterId.email}
							</p>
						</div>
						<div>
							<label htmlFor="createdAt">Created At</label>
							<p>
								{type === "add"
									? formattedDateTime(currentDateTime.toString())
									: formattedDateTime(data?.ticket?.createdAt ?? "")}
							</p>
						</div>
						<div>
							<label htmlFor="linkProject">Link Project Id</label>
							{
								<CustomProject setProjectId={setProjectId}>
									<button className="p-[10px] border-solid border border-[#ddd] rounded-[5px] text-[18px]">
										{projectId ? projectId : "Add"}
									</button>
								</CustomProject>
							}
						</div>
					</div>
				</div>
				<div className="w-full flex justify-end">
					<button
						className="w-full py-3 bg-[#3498db] font-bold text-white rounded-[5px]"
						onClick={handleSubmit}
					>
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
				<ImageModel
					shouldShowModal={showImageModal}
					handleClose={() => setShowImageModal(false)}
					image={selectedImage}
				/>
			</div>
		</Modal>
	);
};

export default TicketModal;
