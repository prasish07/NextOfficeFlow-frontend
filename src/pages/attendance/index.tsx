import Modal from "@/components/attendance/Modal";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetAllAttendance } from "@/query/attendance";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Index = () => {
	const { isDesktopView, isTabletView } = useScreenWidth();
	const [showModal, setShowModal] = useState(false);
	const { data, isLoading, isError } = useGetAllAttendance();

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
					<h3>Period</h3>
					<select name="filter" id="filter">
						<option value="this-month">This Month</option>
						<option value="last-month">Last Month</option>
						<option value="this-year">This Year</option>
						<option value="last-year">Last Year</option>
					</select>
				</div>
				<button
					onClick={() => {
						setShowModal(true);
					}}
				>
					Manual Attendance
				</button>
			</div>
			<div className="attendance__info">
				<div>
					<h3>Working Days</h3>
					<p>20</p>
				</div>
				<div>
					<h3>Present</h3>
					<p>18</p>
				</div>
				<div>
					<h3>Absent</h3>
					<p>2</p>
				</div>
				<div>
					<h3>Early Going</h3>
					<p>0</p>
				</div>
				<div>
					<h3>Late Coming</h3>
					<p>0</p>
				</div>
				<div>
					<h3>Overtime</h3>
					<p>0</p>
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
						{allTimeAttendance.map((attendance: any) => {
							const formattedCheckInDate = new Date(
								attendance.checkIn
							).toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
								hour12: true,
							});

							const formattedCheckOutDate = new Date(
								attendance.checkOut
							).toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
								hour12: true,
							});
							const formattedDate = new Date(
								attendance.date
							).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							});
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
											}}
										>
											View
										</button>
									</td>
								</tr>
							);
						})}
						
					</tbody>
				</table>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
};

export default Index;
