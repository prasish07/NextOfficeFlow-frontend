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
import Assignn from "./Assignn";
import { addAssignee } from "@/query/employee";

const ProjectSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	Description: z.string().min(1, { message: "Description is required" }),
	startDate: z
		.string()
		.refine((value) => !!value, { message: "Start Date is required" }),
	endDate: z
		.string()
		.refine((value) => !!value, { message: "End Date is required" }),
	Progress: z.string(),
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
	const [assignee, setAssignee] = useState([]);

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
			console.log(data, "data");

			const { project } = data;
			const formattedStartDate = project.startDate
				? project.startDate.split("T")[0]
				: "";
			const formattedEndDate = project.endDate
				? project.endDate.split("T")[0]
				: "";

			setValue("title", project.title);
			setValue("Description", project.Description);
			setValue("startDate", formattedStartDate);
			setValue("endDate", formattedEndDate);
			setValue("Progress", project.Progress);
			setValue("status", project.status);
			setValue("estimatedTime", project.estimatedTime);
			setProjectId(project._id);
			setAssignee(project.AssigneeId);
		}
	}, [data, isError, isAdd, setValue]);

	const onSubmit = (data: any) => {
		if (isAdd) {
			postMutation.mutate(data);
		}
		if (isUpdate) {
			updateMutation.mutate({ data: { ...data }, id: selectedId });
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="employee__form">
					<div className="employee__form-item">
						<div className="employee__form-item--group">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								{...register("title")}
								placeholder="title"
								id="title"
							/>
							{errors.title && (
								<p className="text-red-500">{`${errors.title.message}`}</p>
							)}
						</div>
						<div className="employee__form-item--group">
							<label htmlFor="Description">Description</label>
							<textarea
								{...register("Description")}
								placeholder="Description"
								id="Description"
							/>
							{errors.Description && (
								<p className="text-red-500">{`${errors.Description.message}`}</p>
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

						<div className="">
							<label htmlFor="AssigneeId">Assignees</label>
							<div>
								<div className="project__assignee-item">
									{!!data?.project &&
										assignee?.map((item: any) => {
											return (
												<div
													key={item.id}
													className="project__manage-info--avatar"
												>
													<span
														className="w-[50px] h-[50px] rounded-[50%] bg-[#bcbcf3] text-[#5a4e4e] flex justify-center items-center font-bold cursor-pointer capitalize"
														title={item.email}
													>
														{item.email[0]}
													</span>
												</div>
											);
										})}
								</div>

								<button
									className="add-btn"
									type="button"
									onClick={() => setShowModal(true)}
								>
									Add
								</button>
							</div>
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="Progress">Progress in %</label>
							<input
								type="number"
								{...register("Progress")}
								placeholder="Progress"
								id="Progress"
							/>
							{errors.Progress && (
								<p className="text-red-500">{`${errors.Progress.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="status">Status</label>
							<input
								type="text"
								{...register("status")}
								placeholder="status"
								id="status"
							/>
							{errors.status && (
								<p className="text-red-500">{`${errors.status.message}`}</p>
							)}
						</div>

						<div className="employee__form-item--group">
							<label htmlFor="estimatedTime">Estimated Time in Hours</label>
							<input
								type="number"
								{...register("estimatedTime")}
								placeholder="estimatedTime"
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
			<Assignn
				showModal={showModal}
				setShowModal={setShowModal}
				projectId={projectId}
			/>
		</>
	);
};

export default ManageAction;
