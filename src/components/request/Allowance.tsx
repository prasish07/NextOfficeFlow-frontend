import React, { useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation } from "@tanstack/react-query";
import { addAllowanceRequest } from "@/query/request";
import { toast } from "react-toastify";

const Allowance = ({ showModal, setShowModal }: Props) => {
	const [data, setData] = useState({
		amount: "",
		reason: "",
		requestType: "allowance",
	});

	const allowanceMutation = useMutation({
		mutationFn: addAllowanceRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setData({
				amount: "",
				reason: "",
				requestType: "allowance",
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
		allowanceMutation.mutate(data);
	};
	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2>Allowance Request</h2>}
		>
			<form className="form__box" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						id="amount"
						name="amount"
						required
						onChange={handleChange}
						value={data.amount}
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
					/>
				</div>
				<button className="add-btn" type="submit">
					Request
				</button>
			</form>
		</Modal>
	);
};

export default Allowance;
