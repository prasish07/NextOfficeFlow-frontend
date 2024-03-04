import React, { useState } from "react";
import { MdMoneyOff } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { SlNote } from "react-icons/sl";
import Leave from "@/components/request/Leave";
import Allowance from "@/components/request/Allowance";
import Overtime from "@/components/request/Overtime";
import Attendance from "@/components/request/Attendence";

const Request = () => {
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [showAllowanceModal, setShowAllowanceModal] = useState(false);
	const [showOvertimeModal, setShowOvertimeModal] = useState(false);
	const [showAttendanceModal, setShowAttendanceModal] = useState(false);

	return (
		<div className="request">
			<h2 className="request__main-title">Request</h2>
			<div className="request__options">
				<div
					className="request__options-element"
					onClick={() => {
						setShowLeaveModal(true);
					}}
				>
					<FaHome size={34} />
					<h3>Leave</h3>
				</div>
				<div
					className="request__options-element"
					onClick={() => {
						setShowAllowanceModal(true);
					}}
				>
					<MdMoneyOff size={34} />
					<h3>Allowance</h3>
				</div>
				<div
					className="request__options-element"
					onClick={() => setShowOvertimeModal(true)}
				>
					<IoTimeSharp size={34} />
					<h3>Overtime Request</h3>
				</div>
				<div
					className="request__options-element"
					onClick={() => setShowAttendanceModal(true)}
				>
					<SlNote size={34} />
					<h3>Attendance</h3>
				</div>
			</div>
			<Leave
				showModal={showLeaveModal}
				setShowModal={setShowLeaveModal}
				type="add"
			/>
			<Allowance
				showModal={showAllowanceModal}
				setShowModal={setShowAllowanceModal}
				type="add"
			/>
			<Overtime
				showModal={showOvertimeModal}
				setShowModal={setShowOvertimeModal}
				type="add"
			/>
			<Attendance
				showModal={showAttendanceModal}
				setShowModal={setShowAttendanceModal}
				type="add"
			/>
		</div>
	);
};

export default Request;
