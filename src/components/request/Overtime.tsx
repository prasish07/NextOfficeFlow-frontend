import React, { useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addOverTimeRequest } from "@/query/request";

const Overtime = ({ showModal, setShowModal }: Props) => {
	const [data, setData] = useState({
		date: "",
		startTime: "",
		endTime: "",
		reason: "",
		requestType: "overtime",
	});

	const overtimeMutation = useMutation({
		mutationFn: addOverTimeRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setData({
				date: "",
				startTime: "",
				endTime: "",
				reason: "",
				requestType: "overtime",
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
		overtimeMutation.mutate(data);
	};
	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2>Overtime Request</h2>}
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
					<label htmlFor="startTime">Start Time</label>
					<input
						type="time"
						id="startTime"
						name="startTime"
						required
						onChange={handleChange}
						value={data.startTime}
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="endTime">End Time</label>
					<input
						type="time"
						id="endTime"
						name="endTime"
						required
						onChange={handleChange}
						value={data.endTime}
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

export default Overtime;
