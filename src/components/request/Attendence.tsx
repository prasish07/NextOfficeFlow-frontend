import React, { useEffect, useState } from "react";
import { Props } from "./Leave";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	addAttendanceRequest,
	updateStatus,
	useGetUserRequest,
} from "@/query/request";

const Attendance = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const [data, setData] = useState({
		date: "",
		reason: "",
		requestType: "attendance",
		status: "pending",
	});
	const queryClient = useQueryClient();
	const isUpdate = type === "update";
	const {
		data: allData,
		isLoading,
		isError,
	} = useGetUserRequest(selectedId as string);

	const attendanceMutation = useMutation({
		mutationFn: addAttendanceRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			setData({
				date: "",
				reason: "",
				requestType: "attendance",
				status: "pending",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const attendanceUpdateMutation = useMutation({
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
		attendanceUpdateMutation.mutate({
			requestId: selectedId as string,
			status: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		attendanceMutation.mutate(data);
	};

	useEffect(() => {
		if (isError || !allData || !allData?.request) {
			return;
		}
		const { attendanceId: attendanceData } = allData.request;

		const formattedDate = attendanceData?.date
			? attendanceData.date.split("T")[0]
			: "";

		if (type == "update") {
			setData({
				date: formattedDate,
				reason: attendanceData?.reason,
				requestType: "attendance",
				status: allData?.request?.status,
			});
		}
		if (type === "add") {
			setData({
				date: "",
				reason: "",
				requestType: "attendance",
				status: "pending",
			});
		}
	}, [allData, type, isError, isLoading]);

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

export default Attendance;
