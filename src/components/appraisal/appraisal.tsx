import React, { useState } from "react";
import { Props } from "../request/Leave";
import { Modal } from "../model/Model";
import { useGetUserDetails } from "@/query/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addFeedback,
	increaseSalary,
	promoteEmployee,
} from "@/query/appraisal";
import { toast } from "react-toastify";

const Appraisal = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const isPromote = type === "Promote";
	const isSalary = type === "Salary";
	const [appraisalData, setAppraisalData] = useState({
		newPosition: "",
		newSalary: 0,
		feedback: "",
	});
	const { data, isLoading, isError } = useGetUserDetails({
		userId: selectedId as string,
	});
	const queryClient = useQueryClient();
	const promoteMutation = useMutation({
		mutationFn: promoteEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appraisal"] });
			toast.success("Employee  promoted successfully");
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const increaseSalaryMutation = useMutation({
		mutationFn: increaseSalary,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appraisal"] });
			toast.success("Employee  salary increased successfully");
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const feedbackMutation = useMutation({
		mutationFn: addFeedback,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["appraisal"] });
			toast.success("Feedback  added successfully!");
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) return;

	if (isError || !data || !data.data) return;
	const { data: employeeData } = data;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isPromote) {
			promoteMutation.mutate({
				selectedId: selectedId as string,
				data: appraisalData,
			});
		}
		if (isSalary) {
			increaseSalaryMutation.mutate({
				selectedId: selectedId as string,
				data: appraisalData,
			});
		}
		if (type === "Feedback") {
			feedbackMutation.mutate({
				selectedId: selectedId as string,
				data: appraisalData,
			});
		}
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setAppraisalData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2 className="capitalize">{`${type}`}</h2>}
		>
			<form className="form__box" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label>
						Employee ID: <span className="text-[#3498db]">{selectedId}</span>
					</label>
				</div>
				<hr className="mt-5 mb-5" />
				{isPromote && (
					<>
						<div className="form__box-element">
							<label htmlFor="currentPosition">Current Position</label>
							<input
								type="text"
								className="capitalize"
								id="currentPosition"
								readOnly
								value={employeeData?.position}
							/>
						</div>
						<div className="mb-2 text-center">l</div>
						<div className="form__box-element">
							<label htmlFor="currentPosition">Promoted Position</label>
							<input
								type="text"
								id="currentPosition"
								name="newPosition"
								value={appraisalData.newPosition}
								onChange={handleChange}
							/>
						</div>
						<hr className="mb-5 mt-5" />
					</>
				)}
				{(isSalary || isPromote) && (
					<>
						<div className="form__box-element">
							<label htmlFor="currentSalary">Current Salary(Rs)</label>
							<input
								type="text"
								id="currentSalary"
								readOnly
								value={employeeData?.salary}
							/>
						</div>
						<div className="mb-2 text-center">l</div>
						<div className="form__box-element">
							<label htmlFor="newSalary">New Salary(Rs)</label>
							<input
								type="number"
								id="newSalary"
								name="newSalary"
								value={appraisalData.newSalary}
								onChange={handleChange}
							/>
						</div>
						<hr className="mb-5 mt-5" />
					</>
				)}

				<div className="form__box-element">
					<label htmlFor="feedback">Feedback</label>
					<textarea
						id="feedback"
						placeholder="Give Feedback"
						rows={6}
						value={appraisalData.feedback}
						name="feedback"
						onChange={handleChange}
					/>
				</div>
				<hr className="mb-5 mt-5" />
				<button className="btn">
					{isPromote
						? "Give Promotion"
						: isSalary
						? "Increase Salary"
						: "Give Feedback"}
				</button>
			</form>
		</Modal>
	);
};

export default Appraisal;
