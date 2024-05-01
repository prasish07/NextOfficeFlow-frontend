import { useGetAllRequestOfUser } from "@/query/request";
import React, { useState } from "react";
import { IoTimeSharp } from "react-icons/io5";
import { MdMoneyOff } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { FaHome } from "react-icons/fa";
import classNames from "classnames";

const MyRequest = () => {
	const [selectedType, setSelectedType] = useState("leave");
	const activeClass = "active";
	const [filter, setFilter] = useState({
		startDate: "",
		endDate: "",
		searchEmployee: "",
	});
	const { data, isLoading, isError, refetch } = useGetAllRequestOfUser({
		startDate: filter.startDate,
		endDate: filter.endDate,
		searchEmployee: filter.searchEmployee,
		selectedType: selectedType,
	});

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
				const btnClasses = classNames(
					"capitalize",
					{ "bg-green-400": item.status.includes("approved") },
					{ "bg-red-400": item.status.includes("rejected") },
					{ "bg-yellow-400": item.status.includes("pending") }
				);

				return (
					<div className="request__list-element" key={item._id}>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<FaHome size={30} />
								<h3 className="capitalize">{item.requestType}</h3>
								<p>{daysDifference} Days</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedStartDate}</h3>
								<p className={`${btnClasses}`}>{item.status}</p>
							</div>
						</div>
					</div>
				);
			});
		} else if (selectedType === "allowance") {
			return filterElement.map((item: any) => {
				const btnClasses = classNames(
					"capitalize",
					{ "bg-green-400": item.status.includes("approved") },
					{ "bg-red-400": item.status.includes("rejected") },
					{ "bg-yellow-400": item.status.includes("pending") }
				);
				return (
					<div className="request__list-element" key={item._id}>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<MdMoneyOff size={30} />
								<h3 className="capitalize">{item.requestType}</h3>
								<p>{item.allowanceId.amount} Rs</p>
							</div>
							<div className="request__list-element-footer">
								<p className={btnClasses}>{item.status}</p>
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
				const btnClasses = classNames(
					"capitalize",
					{ "bg-green-400": item.status.includes("approved") },
					{ "bg-red-400": item.status.includes("rejected") },
					{ "bg-yellow-400": item.status.includes("pending") }
				);

				return (
					<div className="request__list-element" key={item._id}>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<IoTimeSharp size={30} />
								<h3 className="capitalize">{item.requestType}</h3>
								<p>{hoursDifference} Hours</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedDate}</h3>
								<p className={btnClasses}>{item.status}</p>
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
				const btnClasses = classNames(
					"capitalize",
					{ "bg-green-400": item.status.includes("approved") },
					{ "bg-red-400": item.status.includes("rejected") },
					{ "bg-yellow-400": item.status.includes("pending") }
				);

				return (
					<div className="request__list-element" key={item._id}>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<SlNote size={30} />
								<h3 className="capitalize">{item.requestType}</h3>
								<p>1 Days</p>
							</div>
							<div className="request__list-element-footer">
								<h3>{formattedDate}</h3>
								<p className={btnClasses}>{item.status}</p>
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
				<h2>Filter</h2>
				<div className="request__filter--elements">
					<input
						type="date"
						className="custom-date"
						onChange={(e) => {
							setFilter({ ...filter, startDate: e.target.value });
						}}
					/>
					-
					<input
						type="date"
						className="custom-date"
						onChange={(e) => {
							setFilter({ ...filter, endDate: e.target.value });
						}}
					/>
					<div className="flex gap-2">
						<input
							type="text"
							className="custom-date w-[500px]"
							placeholder="Search employee"
							onChange={(e) => {
								setFilter({ ...filter, searchEmployee: e.target.value });
							}}
							value={filter.searchEmployee}
						/>
						<button onClick={() => refetch()}>Search</button>
					</div>
				</div>
			</div>

			<div className="request__list">{<RequestElement />}</div>
		</div>
	);
};

export default MyRequest;
