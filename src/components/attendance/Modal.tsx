import React from "react";
import { Modal } from "../model/Model";

export interface AttendanceModalProps {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
}

const AttendanceModal = ({ showModal, setShowModal }: AttendanceModalProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");
	};

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
						<input
							type="text"
							name="employee-id"
							id="employee-id"
							placeholder="Enter Employee Email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="date">Date</label>
						<input type="date" name="date" id="date" />
					</div>
					<div className="form-group">
						<label htmlFor="time-in">Time In</label>
						<input type="time" name="time-in" id="time-in" />
					</div>
					<div className="form-group">
						<label htmlFor="time-out">Time Out</label>
						<input type="time" name="time-out" id="time-out" />
					</div>
					<div className="form-group">
						<label htmlFor="status">Status</label>
						<select name="status" id="status">
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
						></textarea>
					</div>
					<button type="submit">Save</button>
				</form>
			</Modal>
		</>
	);
};

export default AttendanceModal;
