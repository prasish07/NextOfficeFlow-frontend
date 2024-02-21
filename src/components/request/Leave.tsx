import React, { useState } from "react";
import { Modal } from "../model/Model";
import { useMutation } from "@tanstack/react-query";
import { addLeaveRequest } from "@/query/request";
import { toast } from "react-toastify";

export interface Props {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Leave = ({ showModal, setShowModal }: Props) => {
	const [data, setDate] = useState({
		type: "leave",
		startDate: "",
		endDate: "",
		reason: "",
		requestType: "leave",
	});

	const leaveMutation = useMutation({
		mutationFn: addLeaveRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setDate({
				type: "leave",
				startDate: "",
				endDate: "",
				reason: "",
				requestType: "leave",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setDate((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		leaveMutation.mutate(data);
	};
	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2>Leave Request</h2>}
		>
			<form className="form__box" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label htmlFor="type">Type</label>
					<select name="type" id="type" required onChange={handleChange}>
						<option value="event">Leave</option>
						<option value="reminder">Work From Home</option>
					</select>
				</div>
				<div className="form__box-element">
					<label htmlFor="startDate">Start Date</label>
					<input
						type="date"
						name="startDate"
						id="startDate"
						required
						onChange={handleChange}
						value={data.startDate}
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="endDate">End Date</label>
					<input
						type="date"
						name="endDate"
						id="endDate"
						onChange={handleChange}
						required
						value={data.endDate}
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="reason">Reason</label>
					<textarea
						name="reason"
						id="reason"
						placeholder="State the reason"
						rows={4}
						onChange={handleChange}
						value={data.reason}
						required
					/>
				</div>
				<button className="add-btn" type="submit">
					Request
				</button>
			</form>
		</Modal>
	);
};

export default Leave;
