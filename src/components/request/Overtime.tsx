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
import { useGlobalProvider } from "@/context/GlobalProvicer";
import PMAssignee from "../dropdown/pmAssignee";
import { dateFormatter } from "@/utils/data";

const Overtime = ({ showModal, setShowModal, type, selectedId }: Props) => {
	const [data, setData] = useState({
		date: "",
		startTime: "",
		endTime: "",
		reason: "",
		requestType: "overtime",
		pmStatus: "pending",
		status: "pending",
	});
	const queryClient = useQueryClient();
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const isHRAdmin = role === "HR" || role === "admin";
	const [PM, setPM] = useState({
		userId: "",
		email: "",
	});

	const isUpdate = type === "update";
	const {
		data: allData,
		isLoading,
		isError,
	} = useGetUserRequest(selectedId as string);

	const overTimeMutation = useMutation({
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
	const handlePMStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		overTimeMutation.mutate({
			requestId: selectedId as string,
			data: { pmStatus: value },
		});
	};

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
				pmStatus: "pending",
				status: "pending",
			});
			setPM({
				userId: "",
				email: "",
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		overtimeUpdateMutation.mutate({
			requestId: selectedId as string,
			data: { status: value },
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
		const formattedData = { ...data, requestedTo: PM.userId };
		overtimeMutation.mutate(formattedData);
	};

	useEffect(() => {
		if (isError || !allData || !allData?.request) {
			return;
		}
		const { overtimeId: overtimeData } = allData.request;

		if (type == "update") {
			setData({
				date: dateFormatter(overtimeData?.date ?? new Date().toString()),
				startTime: overtimeData?.startTime,
				endTime: overtimeData?.endTime,
				reason: overtimeData?.reason,
				requestType: "overtime",
				pmStatus: allData?.request?.pmStatus,
				status: allData?.request?.status,
			});
			setPM({
				userId: allData?.request?.requestedTo?._id,
				email: allData?.request?.requestedTo?.email,
			});
		}
		if (type === "add") {
			setData({
				date: "",
				startTime: "",
				endTime: "",
				reason: "",
				requestType: "overtime",
				pmStatus: "pending",
				status: "pending",
			});
			setPM({
				userId: "",
				email: "",
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
						disabled={isUpdate}
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
						disabled={isUpdate}
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
						disabled={isUpdate}
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
						disabled={isUpdate}
					/>
				</div>
				{!isProjectManager && (
					<div className="form__box-element">
						<label htmlFor="">
							Select Project Manager to request the leave
						</label>
						<PMAssignee setPM={setPM}>
							<button
								className="py-4 px-8 mt-2 mb-5 border-solid border border-[#ddd] rounded-[20px] w-full"
								type="button"
								disabled={isUpdate}
							>
								{PM.email ? PM.email : "Add"}
							</button>
						</PMAssignee>
					</div>
				)}
				{isUpdate && (isProjectManager || isHRAdmin) && (
					<div className="form__box-element">
						<label htmlFor="status">PM Approval Status</label>
						<select
							name="pmStatus"
							id="status"
							required
							onChange={handlePMStatusChange}
							value={data.pmStatus}
							disabled={!isProjectManager || data.pmStatus !== "pending"}
						>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
						</select>
					</div>
				)}
				{isUpdate && isHRAdmin && (
					<div className="form__box-element">
						<label htmlFor="status">Status</label>
						<select
							name="status"
							id="status"
							required
							onChange={handleStatusChange}
							value={data.status}
							disabled={data.status !== "pending"}
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
