import React, { useEffect, useState } from "react";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addLeaveRequest,
	updateStatus,
	useGetUserRequest,
} from "@/query/request";
import { toast } from "react-toastify";
import PMAssignee from "../dropdown/pmAssignee";

export interface Props {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
	selectedId?: string;
}

const Leave = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const [data, setDate] = useState({
		type: "leave",
		startDate: "",
		endDate: "",
		reason: "",
		requestType: "leave",
		status: "pending",
	});
	const [PM, setPM] = useState<string>("");
	const {
		data: allData,
		isLoading,
		isError,
	} = useGetUserRequest(selectedId as string);
	const isUpdate = type === "update";
	const queryClient = useQueryClient();

	const leaveUpdateMutation = useMutation({
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

	const leaveMutation = useMutation({
		mutationFn: addLeaveRequest,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setShowModal(false);
			queryClient.invalidateQueries({
				queryKey: ["requests"],
			});
			setDate({
				type: "leave",
				startDate: "",
				endDate: "",
				reason: "",
				requestType: "leave",
				status: "pending",
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

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log(value);
		leaveUpdateMutation.mutate({
			requestId: selectedId as string,
			status: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		leaveMutation.mutate(data);
	};

	useEffect(() => {
		if (isError || !allData || !allData?.request) {
			return;
		}
		console.log(allData);
		const { leaveId: leaveData } = allData.request;
		const formattedStartDate = leaveData?.startDate
			? leaveData.startDate.split("T")[0]
			: "";
		const formattedEndDate = leaveData?.endDate
			? leaveData.endDate.split("T")[0]
			: "";
		if (type == "update") {
			setDate({
				type: "leave",
				startDate: formattedStartDate,
				endDate: formattedEndDate,
				reason: leaveData?.reason,
				requestType: "leave",
				status: allData?.request?.status,
			});
		}
		if (type === "add") {
			setDate({
				type: "leave",
				startDate: "",
				endDate: "",
				reason: "",
				requestType: "leave",
				status: "pending",
			});
		}
	}, [allData, type, isError, isLoading]);

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
				<div className="form__box-element">
					<label htmlFor="">Select Project Manager to request the leave</label>
					<PMAssignee setPM={setPM}>
						<button
							className="py-4 px-8 mt-2 mb-5 border-solid border border-[#ddd] rounded-[20px]"
							type="button"
						>
							{PM ? PM : "Add"}
						</button>
					</PMAssignee>
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

export default Leave;
