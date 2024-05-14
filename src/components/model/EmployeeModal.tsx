import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "./Model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	ResponseProps,
	addEmployee,
	updateEmployee,
	useGetEmployeeDataByID,
} from "@/query/employee";
import { toast } from "react-toastify";
import Dropzone from "../Dropzone";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const EmployeeFormSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		position: z.string().min(1, { message: "Position is required" }),
		department: z.string().min(1, { message: "Department is required" }),
		team: z.string().min(1, { message: "Team is required" }),
		manager: z.string(),
		description: z.string(),
		salary: z.string().min(1, { message: "Salary required" }),
		startDate: z.string(),
		endDate: z.string(),
		email: z.string().email({ message: "Invalid email format" }),
		role: z.string().min(1, { message: "Role is required" }),
		from: z.string(),
		to: z.string(),
		status: z.string().min(1, { message: "Status is required" }),
	})
	.refine(
		(data) => {
			const startDate = new Date(data.startDate);
			const endDate = new Date(data.endDate);
			return startDate < endDate;
		},
		{
			message: "Start Date is before End Date",
			path: ["endDate"],
		}
	)
	.refine(
		(data) => {
			// Validate that 'from' is before 'to'
			const fromTime = new Date(`2000-01-01T${data.from}`);
			const toTime = new Date(`2000-01-01T${data.to}`);
			return fromTime < toTime;
		},
		{
			message: "Time is mistake",
			path: ["to"],
		}
	);

export type TEmployeeFormSchema = z.infer<typeof EmployeeFormSchema>;

export type TEmployeeFormSchema2 = TEmployeeFormSchema & {
	documents: string[];
};

interface employeeProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	employeeFunctionality: string;
	employeeId?: string;
}

const EmployeeModal = ({
	showModal,
	setShowModal,
	employeeFunctionality,
	employeeId,
}: employeeProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		reset,
	} = useForm<TEmployeeFormSchema>({
		resolver: zodResolver(EmployeeFormSchema),
	});
	const queryClient = useQueryClient();
	const isAddEmployee = employeeFunctionality === "add";
	const isViewOnly = employeeFunctionality === "view";
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const mutateDataAdd = useMutation({
		mutationFn: addEmployee,
		onSuccess: (data: ResponseProps) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["employee", 1] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const removeFile = (fileName: string) => {
		setImages((image) => {
			return image.filter((file) => file !== fileName);
		});
	};

	const mutateDataUpdate = useMutation({
		mutationFn: updateEmployee,
		onSuccess: (data: ResponseProps) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["employee", 1] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const onSubmit = async (data: TEmployeeFormSchema) => {
		if (employeeFunctionality === "add") {
			mutateDataAdd.mutate({ ...data, documents: images });
			reset();
			setShowModal(false);
		}
		if (employeeFunctionality === "update") {
			mutateDataUpdate.mutate({
				data: { ...data, documents: images },
				employeeId,
			});
			setShowModal(false);
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files: FileList = event.target.files;
			setSelectedFiles([...selectedFiles, ...Array.from(files)]);
		}
	};

	const handleUpload = () => {
		// Perform actions with selectedFiles, e.g., upload to server
		for (let i = 0; i < selectedFiles.length; i++) {
			// You can perform additional actions here, such as uploading the files to a server.
		}
	};

	const { data, isLoading, isError } = useGetEmployeeDataByID(employeeId);

	useEffect(() => {
		if (employeeFunctionality === "add") {
			reset();
			setImages([]);
		}
	}, [employeeFunctionality, reset]);

	useEffect(() => {
		if (!isAddEmployee) {
			if (isError || !data) {
				return;
			}

			const employeeData = data.data;

			const formattedStartDate = employeeData.startDate
				? employeeData.startDate.split("T")[0]
				: "";
			const formattedEndDate = employeeData.endDate
				? employeeData.endDate.split("T")[0]
				: "";

			// Set values only if they exist, otherwise, leave them empty or undefined
			setValue("name", employeeData.name || "");
			setValue("email", employeeData?.userId?.email || "");
			setValue("role", employeeData?.userId?.role || "");
			setValue("position", employeeData.position || "");
			setValue("department", employeeData.department || "");
			setValue("team", employeeData.team || "");
			setValue("salary", employeeData?.salary?.toString() || "");
			setValue("manager", employeeData.manager || "");
			setValue("status", employeeData.status || "");
			setValue("startDate", formattedStartDate || "");
			setValue("endDate", formattedEndDate || "");
			setValue("from", employeeData.from || "");
			setValue("to", employeeData.to || "");
			setValue("description", employeeData.description || "");
			setImages(employeeData.documents || []);
		}
	}, [data, isError, isAddEmployee, setValue]);

	return (
		<>
			<Modal
				size="lg"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header={`${employeeFunctionality} Employee`}
				// isLoading={!isAddEmployee && isLoading}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="employee__form">
						<div className="employee__form-item">
							<div className="employee__form-item--group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									{...register("name")}
									placeholder="Name"
									readOnly={isViewOnly}
									id="name"
								/>
								{errors.name && (
									<p className="text-red-500">{`${errors.name.message}`}</p>
								)}
							</div>
							<div className="employee__form-item--group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									{...register("email")}
									placeholder="Email"
									readOnly={isViewOnly}
									id="email"
								/>
								{errors.email && (
									<p className="text-red-500">{`${errors.email.message}`}</p>
								)}
							</div>

							<div className="employee__form-item--group">
								<label htmlFor="role">Role</label>
								<select id="role" className="select" {...register("role")}>
									<option value="admin">Admin</option>
									<option value="employee">Employee</option>
									<option value="project manager">Project Manager</option>
									<option value="HR">HR</option>
								</select>
								{errors.role && (
									<p className="text-red-500">{`${errors.role.message}`}</p>
								)}
							</div>

							<div className="employee__form-item--group">
								<label htmlFor="position">Position</label>
								<input
									type="text"
									{...register("position")}
									placeholder="Position"
									readOnly={isViewOnly}
									id="position"
								/>
								{errors.position && (
									<p className="text-red-500">{`${errors.position.message}`}</p>
								)}
							</div>

							<div className="employee__form-item--group">
								<label htmlFor="department">Department</label>
								<input
									type="text"
									{...register("department")}
									placeholder="Department"
									readOnly={isViewOnly}
									id="department"
								/>
								{errors.department && (
									<p className="text-red-500">{`${errors.department.message}`}</p>
								)}
							</div>

							<div className="employee__form-item--group">
								<label htmlFor="team">Team</label>
								<input
									type="text"
									{...register("team")}
									placeholder="Team"
									readOnly={isViewOnly}
									id="team"
								/>
								{errors.team && (
									<p className="text-red-500">{`${errors.team.message}`}</p>
								)}
							</div>

							<div className="employee__form-item--group">
								<label htmlFor="salary">Salary</label>
								<input
									type="number"
									{...register("salary")}
									placeholder="Salary"
									readOnly={isViewOnly}
									id="salary"
								/>
								{errors.salary && (
									<p className="text-red-500">{`${errors.salary.message}`}</p>
								)}
							</div>
						</div>
						<div className="employee__form-item">
							<div className="employee__form-item--group">
								<label htmlFor="status">Status</label>
								<select id="status" className="select" {...register("status")}>
									<option value="full-time">Full Time</option>
									<option value="part-time">Part Time</option>
									<option value="contract">Contract</option>
									<option value="intern">Internship</option>
								</select>

								{errors.status && (
									<p className="text-red-500">{`${errors.status.message}`}</p>
								)}
							</div>
							<div className="employee__form-item--group">
								<label htmlFor="manager">Manager</label>
								<input
									type="text"
									{...register("manager")}
									placeholder="Manager"
									readOnly={isViewOnly}
									id="manager"
								/>
								{errors.manager && (
									<p className="text-red-500">{`${errors.manager.message}`}</p>
								)}
							</div>
							<div className="employee__form-item--group">
								<label htmlFor="startDate">Start Date</label>
								<input
									type="date"
									{...register("startDate")}
									placeholder="Start Date"
									readOnly={isViewOnly}
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
									readOnly={isViewOnly}
									id="endDate"
								/>
								{errors.endDate && (
									<p className="text-red-500">{`${errors.endDate.message}`}</p>
								)}
							</div>
							<div className="employee__form-item--group">
								<label htmlFor="time">Working Time</label>
								<div className="flex gap-4">
									<input
										type="time"
										{...register("from")}
										placeholder="From"
										readOnly={isViewOnly}
										id="time"
									/>
									<input
										type="time"
										{...register("to")}
										placeholder="To"
										readOnly={isViewOnly}
									/>
								</div>
								{errors.to && (
									<p className="text-red-500">{`${errors.to.message}`}</p>
								)}
							</div>
							<div className="employee__form-item--group">
								<label htmlFor="description">Job Description</label>
								<textarea
									{...register("description")}
									placeholder="Description"
									readOnly={isViewOnly}
									id="description"
								/>
								{errors.description && (
									<p className="text-red-500">{`${errors.description.message}`}</p>
								)}
							</div>
						</div>
					</div>
					{!isViewOnly && (
						<div className="employee__form-documents">
							<h3 className="font-bold">Upload Work Related Documents</h3>
							<Dropzone
								className="p-16 mt-10 border border-neutral-200"
								setImages={setImages}
							/>
						</div>
					)}

					<div className="employee__form-selected-documents">
						<h3 className="font-bold">Selected Documents</h3>
						{/* <div className="employee__form-selected-documents--list">
							{images.map((image, index) => (
								<div
									className="employee__form-selected-documents--list-item"
									key={index}
								>
									<img src={image} alt="" width={100} height={100} />
								</div>
							))}
						</div> */}
						<ul className="dropdown-preview">
							{images.map((image, index) => (
								<li
									key={`${index} ${image}`}
									className="relative h-32 rounded-md shadow-lg"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={image}
										alt={image}
										width={100}
										height={100}
										onLoad={() => {
											URL.revokeObjectURL(image);
										}}
										className="h-full w-full object-contain rounded-md"
									/>
									{!isViewOnly && (
										<button
											type="button"
											className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
											onClick={() => removeFile(image)}
										>
											<IoClose className="w-5 h-5  hover:fill-secondary-400 transition-colors" />
										</button>
									)}
								</li>
							))}
						</ul>
					</div>
					{!isViewOnly && (
						<div className="employee__form-add justify-end">
							{employeeFunctionality === "add" ? (
								<button type="submit" disabled={isSubmitting}>
									Add
								</button>
							) : (
								<button type="submit" disabled={isSubmitting}>
									Update
								</button>
							)}
						</div>
					)}
				</form>
			</Modal>
		</>
	);
};

export default EmployeeModal;
