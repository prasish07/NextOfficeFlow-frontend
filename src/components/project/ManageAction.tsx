import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	addProject,
	updateProject,
	useGetProjectDetails,
} from "@/query/project";
import { IoIosClose } from "react-icons/io";
import { addAssignee } from "@/query/employee";
import { IoClose } from "react-icons/io5";
import SelectAssignee from "./SelectAssignee";

const ProjectSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	startDate: z
		.string()
		.refine((value) => !!value, { message: "Start Date is required" }),
	endDate: z
		.string()
		.refine((value) => !!value, { message: "End Date is required" }),
	progress: z.string(),
	status: z.string(),
	estimatedTime: z.string().min(1, { message: "Estimated Time is required" }),
});

export type TProjectSchema = z.infer<typeof ProjectSchema>;

const ManageAction = ({
	type,
	selectedId,
}: {
	type: string;
	selectedId: string;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		reset,
	} = useForm<TProjectSchema>({
		resolver: zodResolver(ProjectSchema),
	});
	const queryClient = useQueryClient();
	const isUpdate = type === "update";
	const isAdd = type === "new";
	const [showModal, setShowModal] = useState(false);
	const [projectId, setProjectId] = useState<string>("");
	const [assignee, setAssignee] = useState([
		{
			_id: "",
			email: "",
		},
	]);

	const { data, isLoading, isError } = useGetProjectDetails({
		endpoint: selectedId,
	});
	const postMutation = useMutation({
		mutationFn: addProject,
		onSuccess: () => {
			reset();
			toast.success("Project added successfully");
			// queryClient.invalidateQueries("project list");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateProject,
		onSuccess: () => {
			toast.success("Project updated successfully");
			// queryClient.invalidateQueries("project list");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	useEffect(() => {
		if (type === "new") {
			reset();
			setAssignee([]);
		}
	}, [type, reset]);

	useEffect(() => {
		if (!isAdd) {
			if (isError || !data) {
				return;
			}

			const { project } = data;
			const formattedStartDate = project.startDate
				? project.startDate.split("T")[0]
				: "";
			const formattedEndDate = project.endDate
				? project.endDate.split("T")[0]
				: "";

			setValue("title", project.title);
			setValue("description", project.description);
			setValue("startDate", formattedStartDate);
			setValue("endDate", formattedEndDate);
			setValue("progress", project.progress.toString());
			setValue("status", project.status);
			setValue("estimatedTime", project.estimatedTime);
			setProjectId(project._id);
			setAssignee(
				project.assigneeId.map((item: any) => {
					return {
						_id: item._id,
						email: item.email,
					};
				})
			);
		}
	}, [data, isError, isAdd, setValue]);

	const onSubmit = (data: any) => {
		if (isAdd) {
			postMutation.mutate({ ...data, assigneeId: assignee });
		}
		if (isUpdate) {
			updateMutation.mutate({
				data: { ...data, assigneeId: assignee },
				id: selectedId,
			});
		}
	};

	const handleRemoveAssignee = (id: string) => {
		const newAssignee = assignee.filter((item: any) => item._id !== id);
		setAssignee(newAssignee);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="employee__form-2">
					<div className="employee__form-item">
						<div className="employee__form-item--group">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								{...register("title")}
								placeholder="Title"
								id="title"
							/>
							{errors.title && (
								<p className="text-red-500">{`${errors.title.message}`}</p>
							)}
						</div>
						<div className="employee__form-item--group">
							<label htmlFor="Description">Description</label>
							<textarea
								{...register("description")}
								placeholder="Description"
								id="Description"
							/>
							{errors.description && (
								<p className="text-red-500">{`${errors.description.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="startDate">Start Date</label>
							<input
								type="date"
								{...register("startDate")}
								placeholder="Start Date"
								id="startDate"
							/>
							{errors.startDate && (
								<p className="text-red-500">{`${errors.startDate.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="endDate">End Date</label>
							<input
								type="date"
								{...register("endDate")}
								placeholder="End Date"
								id="endDate"
							/>
							{errors.endDate && (
								<p className="text-red-500">{`${errors.endDate.message}`}</p>
							)}
						</div>

						{/* {!isAdd && ( */}
						<div>
							<label htmlFor="AssigneeId">Assignees</label>
							<div>
								{assignee?.length !== 0 ? (
									<div className="project__assignee-item">
										{assignee.map((item: any) => {
											return (
												<div
													key={item.id}
													className="project__manage-info--avatar relative"
												>
													<span
														className="w-[50px] h-[50px] rounded-[50%] bg-[#bcbcf3] text-[#5a4e4e] flex justify-center items-center font-bold cursor-pointer capitalize"
														title={item?.email}
													>
														{item?.email[0]}
													</span>
													<button
														type="button"
														className="w-7 h-7 border border-secondary-400 bg-blue-200 rounded-full flex justify-center items-center absolute -top-2 -right-3 hover:bg-white transition-colors"
														onClick={() => handleRemoveAssignee(item._id)}
													>
														<IoClose className="w-5 h-5  hover:fill-secondary-400 transition-colors" />
													</button>
												</div>
											);
										})}
									</div>
								) : (
									""
								)}

								<button
									className="add-btn mt-2"
									type="button"
									onClick={() => setShowModal(true)}
								>
									Add
								</button>
							</div>
						</div>
						{/* )} */}

						<div className="employee__form-item--group">
							<label htmlFor="Progress">Progress in %</label>
							<input
								type="number"
								{...register("progress")}
								placeholder="Progress"
								id="Progress"
							/>
							{errors.progress && (
								<p className="text-red-500">{`${errors.progress.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="status">Status</label>
							{/* <input
								type="text"
								{...register("status")}
								placeholder="Status"
								id="status"
							/> */}
							<select id="status" {...register("status")} className="select">
								<option value="To-Do">To-Do</option>
								<option value="in-progress">In Progress</option>
								<option value="completed">Completed</option>
								<option value="overdue">OverDue</option>
								<option value="cancelled">Cancelled</option>
							</select>
							{errors.status && (
								<p className="text-red-500">{`${errors.status.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="estimatedTime">Estimated Time in Hours</label>
							<input
								type="number"
								{...register("estimatedTime")}
								placeholder="Estimated Time"
								id="estimatedTime"
							/>
							{errors.estimatedTime && (
								<p className="text-red-500">{`${errors.estimatedTime.message}`}</p>
							)}
						</div>
					</div>
				</div>
				<div className="employee__form-add justify-start">
					{type === "new" ? (
						<button type="submit" disabled={isSubmitting}>
							Add
						</button>
					) : (
						<button type="submit" disabled={isSubmitting}>
							Update
						</button>
					)}
				</div>
			</form>
			<SelectAssignee
				showModal={showModal}
				setShowModal={setShowModal}
				assignee={assignee}
				setAssignee={setAssignee}
			/>
		</>
	);
};

export default ManageAction;
