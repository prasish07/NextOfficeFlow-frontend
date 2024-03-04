import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetMyTodayAttendance } from "@/query/attendance";
import React from "react";

const ProfileAttendance = () => {
	const { isDesktopView, isTabletView } = useScreenWidth();
	const { data, isLoading, isError } = useGetMyTodayAttendance();

	if (isLoading) {
		return <div className="loader" />;
	}

	if (isError || !data) {
		return <div>Something went wrong</div>;
	}

	const { attendance: attendances } = data;

	return (
		<>
			<h2>My Attendance</h2>
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
			</div>
			<div
				className="attendance__list"
				style={{
					backgroundColor: "rgba(233, 230, 230, 0.199)",
					border: "1px solid #ccc",
				}}
			>
				<table>
					<thead>
						<tr>
							{isDesktopView && !isTabletView && (
								<>
									<th>Date</th>
									<th>Check-In</th>
									<th>Check-Out</th>
								</>
							)}
							<th>Status</th>

							{/* <th>Details</th> */}
						</tr>
					</thead>
					<tbody>
						{attendances.map((attendance: any) => {
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
									{isDesktopView && !isTabletView && (
										<>
											<td>{formattedDate}</td>
										</>
									)}
									<td>{formattedCheckInDate}</td>
									<td>{formattedCheckOutDate}</td>
									<td>{attendance.late ? "Late" : "In-Time"}</td>
									{/* <td>
										<button
											onClick={() => {
												setShowModal(true);
											}}
										>
											View
										</button>
									</td> */}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ProfileAttendance;
