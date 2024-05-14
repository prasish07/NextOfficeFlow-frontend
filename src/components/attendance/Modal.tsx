import React, { useEffect, useState } from "react";
import { Modal } from "../model/Model";
import SearchEmployee from "../dropdown/searchEmployee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	manualAttendance,
	updateAttendance,
	useGetSingleAttendance,
} from "@/query/attendance";
import { toast } from "react-toastify";
import {
	TimeFormatterDate,
	TimeFormatterDate24hours,
	dateFormatter,
	timeFormatter,
} from "@/utils/data";

export interface AttendanceModalProps {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	id: string;
	type: string;
}

const AttendanceModal = ({
	showModal,
	setShowModal,
	id,
	type,
}: AttendanceModalProps) => {
	const queryClient = useQueryClient();
	const manaualMutation = useMutation({
		mutationFn: manualAttendance,
		onSuccess: (data: any) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["attendance", "all"] });
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateAttendance,
		onSuccess: (data: any) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["attendance", "all"] });
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const { data, isLoading, isError } = useGetSingleAttendance(id);

	const [formData, setFormData] = useState({
		date: "",
		checkIn: "",
		checkOut: "",
		status: "present",
		reason: "",
	});

	const [employee, setEmployee] = useState({
		id: "",
		email: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (type === "add") {
			const data = {
				...formData,
				checkIn: formData.checkIn.includes("N/A")
					? ""
					: `${formData.date}T${formData.checkIn}`,
				checkOut: formData.checkOut.includes("N/A")
					? ""
					: `${formData.date}T${formData.checkOut}`,
				employeeId: employee.id,
			};
			manaualMutation.mutate(data);
		} else {
			const data = {
				...formData,
				checkIn: formData.checkIn.includes("N/A")
					? ""
					: `${formData.date}T${formData.checkIn}`,
				checkOut: formData.checkOut.includes("N/A")
					? ""
					: `${formData.date}T${formData.checkOut}`,
				id: id,
			};
			updateMutation.mutate(data);
		}
	};

	useEffect(() => {
		if (isLoading || isError) return;
		if (data && type === "view") {
			setEmployee({
				id: data?.userId,
				email: data?.employeeEmail,
			});
			setFormData({
				date: dateFormatter(data?.date),
				checkIn:
					new Date(data?.checkIn).toString() !== "Invalid Date"
						? TimeFormatterDate24hours(data?.checkIn)
						: "N/A",
				checkOut:
					new Date(data?.checkOut).toString() !== "Invalid Date"
						? TimeFormatterDate24hours(data?.checkOut)
						: "N/A",
				status: data?.status,
				reason: data?.reason,
			});
		} else {
			setEmployee({
				id: "",
				email: "",
			});
			setFormData({
				date: "",
				checkIn: "",
				checkOut: "",
				status: "present",
				reason: "",
			});
		}
	}, [data, isError, isLoading, type]);

	return (
		<>
			<Modal
				size="lg"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header={<h2>Manual Attendance</h2>}
			>
				<form className="attendance__form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="employee-id">Employee Email</label>

						<SearchEmployee setEmployee={setEmployee}>
							<button className="search-btn" type="button">
								{employee.email ? employee.email : "Search Employee"}
							</button>
						</SearchEmployee>
					</div>
					<div className="form-group">
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							id="date"
							value={formData.date}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="time-in">Check In</label>
						<input
							type="time"
							name="checkIn"
							id="time-in"
							value={formData.checkIn}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="time-out">Check Out</label>
						<input
							type="time"
							name="checkOut"
							id="time-out"
							value={formData.checkOut}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<h3 className="font-bold mb-2">Breaks</h3>
						{type === "view" &&
							data?.breaks?.map((item: any, index: number) => {
								const today = new Date();
								const breakInTimeParts = item.breakIn.split(":").map(Number);
								const breakOutTimeParts = item.breakOut.split(":").map(Number);
								const breakInTime = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate(),
									breakInTimeParts[0],
									breakInTimeParts[1]
								);
								const breakOutTime = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate(),
									breakOutTimeParts[0],
									breakOutTimeParts[1]
								);

								const durationMilliseconds =
									breakOutTime.getTime() - breakInTime.getTime();
								const durationMinutes = Math.round(
									durationMilliseconds / (1000 * 60)
								);
								const durationHours = Math.floor(durationMinutes / 60);
								const remainingMinutes = durationMinutes % 60;

								return (
									<div
										key={index}
										className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-2 mb-2"
									>
										<div>
											<p className="font-semibold">{item.breakIn}</p>
											<p className="text-sm text-gray-500">Break In</p>
										</div>
										<div>
											<p className="font-semibold">{item.breakOut}</p>
											<p className="text-sm text-gray-500">Break Out</p>
										</div>
										<div>
											<p className="font-semibold">
												{durationHours}h {remainingMinutes}m
											</p>
											<p className="text-sm text-gray-500">Duration</p>
										</div>
									</div>
								);
							})}
					</div>
					<div className="form-group">
						<label htmlFor="status">Status</label>
						<select
							name="status"
							id="status"
							onChange={handleChange}
							value={formData.status}
						>
							<option value="present">Present</option>
							<option value="absent">Absent</option>
							<option value="half-day">Half Day</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="reason">Reason</label>
						<textarea
							name="reason"
							id="reason"
							placeholder="Enter Reason"
							value={formData.reason}
							onChange={handleChange}
						></textarea>
					</div>
					<button type="submit">Save</button>
				</form>
			</Modal>
		</>
	);
};

export default AttendanceModal;
