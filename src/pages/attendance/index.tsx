import Modal from "@/components/attendance/Modal";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetAllAttendance } from "@/query/attendance";
import { TimeFormatterDate, dateWordFormatter } from "@/utils/data";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Index = () => {
	const { isDesktopView, isTabletView } = useScreenWidth();
	const [showModal, setShowModal] = useState(false);
	const [id, setId] = useState("");
	const [type, setType] = useState("");
	const [date, setDate] = useState({
		startDate: "",
		endDate: "",
		searchEmployee: "",
	});
	const { data, isLoading, isError, refetch } = useGetAllAttendance(date);

	if (isLoading) {
		return <div className="loader" />;
	}

	if (isError || !data) {
		return <div>Something went wrong</div>;
	}

	const { allTimeAttendance } = data;

	return (
		<div className="attendance">
			<h2 className="attendance__main-title">Attendance</h2>
			<div className="attendance__menu">
				<div className="attendance__filter">
					<div className="flex gap-2 mt-2 items-center">
						<input
							type="date"
							className="custom-date"
							onChange={(e) => {
								setDate({ ...date, startDate: e.target.value });
							}}
						/>
						-
						<input
							type="date"
							className="custom-date"
							onChange={(e) => {
								setDate({ ...date, endDate: e.target.value });
							}}
						/>
						<button
							onClick={() => {
								refetch();
							}}
						>
							Apply
						</button>
					</div>
				</div>
				<div className="flex gap-2">
					<input
						type="text"
						className="custom-date w-[500px]"
						placeholder="Search employee"
						onChange={(e) => {
							setDate({ ...date, searchEmployee: e.target.value });
						}}
						value={date.searchEmployee}
					/>
					<button onClick={() => refetch()}>Search</button>
				</div>
				<button
					onClick={() => {
						setShowModal(true);
						setType("add");
					}}
				>
					Manual Attendance
				</button>
			</div>
			<div className="attendance__info">
				<div>
					<h3>Working Days</h3>
					<p>{data?.totalWorkingDays}</p>
				</div>
				<div>
					<h3>Present</h3>
					<p>{data?.TotalPresent}</p>
				</div>
				<div>
					<h3>Absent</h3>
					<p>{data?.TotalAbsent}</p>
				</div>
				<div>
					<h3>Early Going</h3>
					<p>{data?.TotalEarlyLeave}</p>
				</div>
				<div>
					<h3>Late Coming</h3>
					<p>{data?.TotalLate}</p>
				</div>
				<div>
					<h3>Overtime</h3>
					<p>{data?.TotalOnTime}</p>
				</div>
			</div>
			<div className="attendance__list">
				<table>
					<thead>
						<tr>
							<th>Employee</th>
							{isDesktopView && !isTabletView && (
								<>
									<th>Position</th>
									<th>Date</th>
								</>
							)}
							<th>Check-In</th>
							<th>Check-Out</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{allTimeAttendance.length ? (
							allTimeAttendance.map((attendance: any) => {
								const checkInDate = new Date(attendance.checkIn);
								const checkOutDate = new Date(attendance.checkOut);

								const formattedCheckInDate =
									checkInDate.toString() !== "Invalid Date"
										? TimeFormatterDate(checkInDate.toString())
										: "N/A";

								const formattedCheckOutDate =
									checkOutDate.toString() !== "Invalid Date"
										? TimeFormatterDate(checkOutDate.toString())
										: "N/A";

								const formattedDate = dateWordFormatter(attendance.date);

								return (
									<tr key={attendance.id}>
										<td>{attendance.employeeName}</td>
										{isDesktopView && !isTabletView && (
											<>
												<td>{attendance.employeePosition}</td>
												<td>{formattedDate}</td>
											</>
										)}
										<td>{formattedCheckInDate}</td>
										<td>{formattedCheckOutDate}</td>
										<td>
											<button
												onClick={() => {
													setShowModal(true);
													setId(attendance._id);
													setType("view");
												}}
											>
												View
											</button>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan={6}>No data found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				id={id}
				type={type}
			/>
		</div>
	);
};

export default Index;
