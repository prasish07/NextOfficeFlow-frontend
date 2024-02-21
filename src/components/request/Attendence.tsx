import React, { useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAttendanceRequest } from "@/query/request";

const Attendance = ({ showModal, setShowModal }: Props) => {
	const [data, setData] = useState({
		date: "",
		reason: "",
		requestType: "attendance",
	});

	const attendanceMutation = useMutation({
		mutationFn: addAttendanceRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setData({
				date: "",
				reason: "",
				requestType: "attendance",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setData((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		attendanceMutation.mutate(data);
	};
	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2>Attendance Request</h2>}
		>
			<form className="form__box" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label htmlFor="date">Date</label>
					<input
						type="date"
						id="date"
						name="date"
						required
						onChange={handleChange}
						value={data.date}
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="reason">Reason</label>
					<textarea
						name="reason"
						id="reason"
						placeholder="State the reason"
						rows={4}
						required
						onChange={handleChange}
						value={data.reason}
					/>
				</div>
				<button className="add-btn" type="submit">
					Request
				</button>
			</form>
		</Modal>
	);
};

export default Attendance;
