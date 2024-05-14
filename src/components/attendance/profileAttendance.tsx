import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetMyTodayAttendance } from "@/query/attendance";
import React, { useEffect, useRef } from "react";

const ProfileAttendance = () => {
	const { isDesktopView, isTabletView } = useScreenWidth();
	const { data, isLoading, isError } = useGetMyTodayAttendance();
	const [filterData, setFilterData] = React.useState<any>([]);
	const startDateRef = useRef<HTMLInputElement>(null);
	const endDateRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setFilterData(data?.attendance);
	}, [data]);

	if (isLoading) {
		return <div className="loader" />;
	}

	if (isError || !data) {
		return <div>Something went wrong</div>;
	}

	const { attendance: attendances } = data;

	const filter = () => {
		const startDate = startDateRef.current?.value;
		const endDate = endDateRef.current?.value;
		if (startDate && endDate) {
			const filteredData = attendances.filter((attendance: any) => {
				const date = new Date(attendance.date);
				return date >= new Date(startDate) && date <= new Date(endDate);
			});
			setFilterData(filteredData);
		} else {
			setFilterData(attendances);
		}
	};

	return (
		<>
			<h2>My Attendance</h2>
			<div className="request__filter">
				<div className="request__filter--elements">
					<input type="date" className="custom-date" ref={startDateRef} />
					-
					<input type="date" className="custom-date" ref={endDateRef} />
					<button onClick={filter}>Search</button>
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
						{filterData?.map((attendance: any) => {
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
									<td>
										{formattedCheckInDate === "Invalid Date"
											? "N/A"
											: formattedCheckInDate}
									</td>
									<td>
										{formattedCheckOutDate === "Invalid Date"
											? "N/A"
											: formattedCheckOutDate}
									</td>
									<td>
										{attendance?.checkInStatus
											? attendance.checkInStatus
											: "N/A"}
									</td>
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
