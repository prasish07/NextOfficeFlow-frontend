import React, { useState } from "react";
import { Props } from "../request/Leave";
import { Modal } from "../model/Model";
import { useGetUserDetails } from "@/query/employee";
import { useMutation } from "@tanstack/react-query";
import {
	addFeedback,
	increaseSalary,
	promoteEmployee,
	useGetAppraisal,
} from "@/query/appraisal";
import { toast } from "react-toastify";

const AppraisalView = ({
	showModal,
	setShowModal,
	type,
	selectedId,
}: Props) => {
	const isPromote = type === "promotion";
	const isSalary = type === "salary increase";
	const { data, isLoading, isError } = useGetAppraisal(selectedId as string);

	if (isLoading) return;

	if (isError || !data || !data.appraisal) return;

	const { appraisal } = data;

	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2 className="capitalize">{`${type}`}</h2>}
		>
			<form className="form__box">
				<div className="form__box-element">
					<label>
						Employee ID: <span className="text-[#3498db]">{selectedId}</span>
					</label>
				</div>
				<hr className="mt-5 mb-5" />
				{isPromote && (
					<>
						<div className="form__box-element">
							<label htmlFor="currentPosition">Past Position</label>
							<input
								type="text"
								className="capitalize"
								id="currentPosition"
								readOnly
								value={appraisal?.pastPosition}
							/>
						</div>
						<div className="mb-2 text-center">l</div>
						<div className="form__box-element">
							<label htmlFor="currentPosition">Promoted Position</label>
							<input
								type="text"
								id="currentPosition"
								name="newPosition"
								value={appraisal.newPosition}
								readOnly
							/>
						</div>
						<hr className="mb-5 mt-5" />
					</>
				)}
				{(isSalary || isPromote) && (
					<>
						<div className="form__box-element">
							<label htmlFor="currentSalary">Past Salary(Rs)</label>
							<input
								type="text"
								id="currentSalary"
								readOnly
								value={appraisal?.pastSalary}
							/>
						</div>
						<div className="mb-2 text-center">l</div>
						<div className="form__box-element">
							<label htmlFor="newSalary">New Salary(Rs)</label>
							<input
								type="number"
								id="newSalary"
								name="newSalary"
								value={appraisal.newSalary}
								readOnly
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
						value={appraisal.feedback}
						name="feedback"
						readOnly
					/>
				</div>
			</form>
		</Modal>
	);
};

export default AppraisalView;
