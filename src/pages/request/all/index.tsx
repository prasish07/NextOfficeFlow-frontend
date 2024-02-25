import { useGetAllRequests } from "@/query/request";
import React, { useState } from "react";
import { IoTimeSharp } from "react-icons/io5";
import { MdMoneyOff } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { FaHome } from "react-icons/fa";
import Leave from "@/components/request/Leave";
import Allowance from "@/components/request/Allowance";
import Overtime from "@/components/request/Overtime";
import Attendance from "@/components/request/Attendence";

const All = () => {
	const { data, isLoading, isError } = useGetAllRequests();
	const [selectedType, setSelectedType] = useState("leave");
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [showAllowanceModal, setShowAllowanceModal] = useState(false);
	const [showOvertimeModal, setShowOvertimeModal] = useState(false);
	const [showAttendanceModal, setShowAttendanceModal] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	const activeClass = "active";

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !data) {
		return <div>Error</div>;
	}

	const { requests } = data;

	const filterElement = requests.filter(
		(item: any) => item.requestType === selectedType
	);

	const RequestElement = () => {
		if (selectedType === "leave") {
			return filterElement.map((item: any) => {
				const startDate = new Date(item.leaveId.startDate);
				const endDate = new Date(item.leaveId.endDate);

				const timeDifference = endDate.getTime() - startDate.getTime();

				let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

				daysDifference = daysDifference + 1;

				const formattedStartDate = new Date(
					item.leaveId.startDate
				).toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				});

				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setShowLeaveModal(item);
							setSelectedId(item._id);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<FaHome size={30} />
								<h3>{item.requestType}</h3>
								<p>{daysDifference} Days</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedStartDate}</h3>
								<p>{item.status}</p>
							</div>
						</div>
					</div>
				);
			});
		} else if (selectedType === "allowance") {
			return filterElement.map((item: any) => {
				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setShowAllowanceModal(true);
							setSelectedId(item._id);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<MdMoneyOff size={30} />
								<h3>{item.requestType}</h3>
								<p>{item.allowanceId.amount} Rs</p>
							</div>
							<div className="request__list-element-footer">
								<p>{item.status}</p>
							</div>
						</div>
					</div>
				);
			});
		} else if (selectedType === "overtime") {
			return filterElement.map((item: any) => {
				const startTime = new Date(`2000-01-01 ${item.overtimeId.startTime}`);
				const endTime = new Date(`2000-01-01 ${item.overtimeId.endTime}`);

				const timeDifference = endTime.getTime() - startTime.getTime();

				const hoursDifference = timeDifference / (1000 * 60 * 60);

				const formattedDate = new Date(item.overtimeId.date).toLocaleDateString(
					"en-US",
					{
						year: "numeric",
						month: "short",
						day: "numeric",
					}
				);

				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setShowOvertimeModal(true);
							setSelectedId(item._id);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<IoTimeSharp size={30} />
								<h3>{item.requestType}</h3>
								<p>{hoursDifference} Hours</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedDate}</h3>
								<p>{item.status}</p>
							</div>
						</div>
					</div>
				);
			});
		} else {
			return filterElement.map((item: any) => {
				const formattedDate = new Date(
					item.attendanceId.date
				).toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				});

				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setShowAttendanceModal(true);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<SlNote size={30} />
								<h3>{item.requestType}</h3>
								<p>1 Days</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedDate}</h3>
								<p>{item.status}</p>
							</div>
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div className="request__my">
			<h2 className="request__main-title">All Request</h2>
			<div className="request__my-options">
				<div
					className={`request__my-options-element ${
						selectedType === "leave" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("leave")}
				>
					<h3>Leave</h3>
				</div>
				<div
					className={`request__my-options-element ${
						selectedType === "allowance" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("allowance")}
				>
					<h3>Allowance</h3>
				</div>
				<div
					className={`request__my-options-element ${
						selectedType === "overtime" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("overtime")}
				>
					<h3>Overtime Request</h3>
				</div>
				<div
					className={`request__my-options-element ${
						selectedType === "attendance" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("attendance")}
				>
					<h3>Attendance</h3>
				</div>
			</div>
			<div className="request__list-count">
				<div>
					<h3>Leave</h3>
					<p>{data.leaveRequest}</p>
				</div>
				<div>
					<h3>Allowance</h3>
					<p>{data.allowanceRequest}</p>
				</div>
				<div>
					<h3>Overtime Request</h3>
					<p>{data.overtimeRequest}</p>
				</div>
				<div>
					<h3>Attendance</h3>
					<p>{data.attendanceRequest}</p>
				</div>
			</div>

			<div className="request__filter">
				<h3>Filter</h3>
				<select name="filter" id="filter">
					<option value="this-month">This Month</option>
					<option value="last-month">Last Month</option>
					<option value="this-year">This Year</option>
					<option value="last-year">Last Year</option>
				</select>
			</div>

			<div className="request__list">{<RequestElement />}</div>
			<Leave
				showModal={showLeaveModal}
				setShowModal={setShowLeaveModal}
				type="update"
				selectedId={selectedId}
			/>
			<Allowance
				showModal={showAllowanceModal}
				setShowModal={setShowAllowanceModal}
				type="update"
				selectedId={selectedId}
			/>
			<Overtime
				showModal={showOvertimeModal}
				setShowModal={setShowOvertimeModal}
				type="update"
				selectedId={selectedId}
			/>
			<Attendance
				showModal={showAttendanceModal}
				setShowModal={setShowAttendanceModal}
				type="update"
				selectedId={selectedId}
			/>
		</div>
	);
};

export default All;

// {selectedType === "leave" ? (
//     <MdSick size={30} />
// ) : selectedType === "allowance" ? (
//     <MdMoneyOff size={30} />
// ) : selectedType === "overtime" ? (
//     <IoTimeSharp size={30} />
// ) : (
//     <SlNote size={30} />
// )}
