import React from "react";
import { Modal } from "./Model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EmployeeFormSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	position: z.string().min(1, { message: "Position is required" }),
	department: z.string().min(1, { message: "Department is required" }),
	team: z.string().min(1, { message: "Team is required" }),
	manager: z.string(),
	description: z.string(),
	githubUsername: z.string(),
	appraisalHistory: z.string(),
	salary: z
		.number()
		.min(0, { message: "Salary must be greater than or equal to 0" }),
	startDate: z.date(),
	endDate: z.date(),
	email: z.string().email({ message: "Invalid email format" }),
	role: z.string(),
	workingHours: z.string(),
});
type TEmployeeFormSchema = z.infer<typeof EmployeeFormSchema>;

interface employeeProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	employeeFunctionality: string;
}

const EmployeeModal = ({
	showModal,
	setShowModal,
	employeeFunctionality,
}: employeeProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TEmployeeFormSchema>({
		resolver: zodResolver(EmployeeFormSchema),
	});

	const onSubmit = async (data: TEmployeeFormSchema) => {};

	return (
		<>
			<Modal
				size="lg"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header="Add Employee"
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="employee__form">
						<div className="employee__form-item">
							<div>
								<input type="text" {...register("name")} placeholder="Name" />
								{errors.name && (
									<p className="text-red-500">{`${errors.name.message}`}</p>
								)}
							</div>
							<div>
								<input
									type="email"
									{...register("email")}
									placeholder="Email"
								/>
								{errors.email && (
									<p className="text-red-500">{`${errors.email.message}`}</p>
								)}
							</div>

							<div>
								<input type="text" {...register("role")} placeholder="Role" />
								{errors.role && (
									<p className="text-red-500">{`${errors.role.message}`}</p>
								)}
							</div>

							<div>
								<input
									type="text"
									{...register("position")}
									placeholder="Position"
								/>
								{errors.position && (
									<p className="text-red-500">{`${errors.position.message}`}</p>
								)}
							</div>

							<div>
								<input
									type="text"
									{...register("department")}
									placeholder="Department"
								/>
							</div>

							<div>
								<input type="text" {...register("team")} placeholder="Team" />
							</div>

							<div>
								<input
									type="Number"
									{...register("salary")}
									placeholder="Salary"
								/>
							</div>
						</div>
						<div className="employee__form-item">
							<div className="employee__form-group">
								<label htmlFor="startDate">Start Date</label>
								<input
									type="date"
									{...register("startDate")}
									placeholder="Start Date"
								/>
							</div>
							<div className="employee__form-group">
								<label htmlFor="endDate">End Date</label>
								<input
									type="date"
									{...register("endDate")}
									placeholder="End Date"
								/>
							</div>
							<div>
								<input
									type="text"
									{...register("workingHours")}
									placeholder="Working Hours"
								/>
								{errors.workingHours && (
									<p className="text-red-500">{`${errors.workingHours.message}`}</p>
								)}
							</div>
							<input
								type="text"
								{...register("manager")}
								placeholder="Manager"
							/>
							<textarea
								{...register("description")}
								placeholder="Description"
							/>
						</div>
					</div>
					<div className="employee__form-add">
						<button type="submit" disabled={isSubmitting}>
							Add
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default EmployeeModal;
