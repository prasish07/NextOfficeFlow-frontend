import React, { useEffect, useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	addOverTimeRequest,
	updateStatus,
	useGetUserRequest,
} from "@/query/request";

const Overtime = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const [data, setData] = useState({
		date: "",
		startTime: "",
		endTime: "",
		reason: "",
		requestType: "overtime",
		status: "pending",
	});
	const queryClient = useQueryClient();

	const isUpdate = type === "update";
	const {
		data: allData,
		isLoading,
		isError,
	} = useGetUserRequest(selectedId as string);

	const overtimeUpdateMutation = useMutation({
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
				status: "pending",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log(value);
		overtimeUpdateMutation.mutate({
			requestId: selectedId as string,
			status: value,
		});
	};

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

	useEffect(() => {
		if (isError || !allData || !allData?.request) {
			return;
		}
		const { overtimeId: overtimeData } = allData.request;
		const formattedDate = overtimeData?.dat
			? overtimeData.date.split("T")[0]
			: "";

		if (type == "update") {
			setData({
				date: formattedDate,
				startTime: overtimeData?.startTime,
				endTime: overtimeData?.endTime,
				reason: overtimeData?.reason,
				requestType: "overtime",
				status: allData?.request?.status,
			});
		}
		if (type === "add") {
			setData({
				date: "",
				startTime: "",
				endTime: "",
				reason: "",
				requestType: "overtime",
				status: "pending",
			});
		}
	}, [allData, type, isError, isLoading]);

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

export default Overtime;
