import React, { useEffect, useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addAllowanceRequest,
	updateStatus,
	useGetUserRequest,
} from "@/query/request";
import { toast } from "react-toastify";

const Allowance = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const [data, setData] = useState({
		amount: "",
		reason: "",
		requestType: "allowance",
		status: "pending",
	});
	const queryClient = useQueryClient();
	const isUpdate = type === "update";
	const {
		data: allData,
		isLoading,
		isError,
	} = useGetUserRequest(selectedId as string);

	const allowanceMutation = useMutation({
		mutationFn: addAllowanceRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setData({
				amount: "",
				reason: "",
				requestType: "allowance",
				status: "pending",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const allowanceUpdateMutation = useMutation({
		mutationFn: updateStatus,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["requests"],
			});
			queryClient.invalidateQueries({
				queryKey: ["request"],
			});
			toast.success(data.message);
			setShowModal(false);
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

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log(value);
		allowanceUpdateMutation.mutate({
			requestId: selectedId as string,
			status: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		allowanceMutation.mutate(data);
	};

	useEffect(() => {
		if (isError || !allData || !allData?.request) {
			return;
		}
		const { allowanceId: allowanceData } = allData.request;
		console.log(allData);

		if (type == "update") {
			setData({
				amount: allowanceData?.amount,
				reason: allowanceData?.reason,
				requestType: "allowance",
				status: allData?.request?.status,
			});
		}
		if (type === "add") {
			setData({
				amount: "",
				reason: "",
				requestType: "allowance",
				status: "pending",
			});
		}
	}, [allData, type, isError, isLoading]);

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
				{isUpdate && (
					<div className="form__box-element">
						<label htmlFor="status">Status</label>
						<select
							name="status"
							id="status"
							required
							onChange={handleStatusChange}
							value={data.status}
						>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
						</select>
					</div>
				)}
				{!isUpdate && (
					<button className="add-btn" type="submit">
						Request
					</button>
				)}
			</form>
		</Modal>
	);
};

export default Allowance;
