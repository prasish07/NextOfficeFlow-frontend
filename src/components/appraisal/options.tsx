import React, { useState } from "react";
import { GiUpgrade, GiReceiveMoney } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import Appraisal from "./appraisal";

const AppraisalOptions = ({
	selectedEmployee,
}: {
	selectedEmployee: string;
}) => {
	const [showModal, setShowModal] = useState(false);
	const [type, setType] = useState("");

	return (
		<div className="request__options">
			<div
				className="request__options-element"
				onClick={() => {
					setShowModal(true);
					setType("Promote");
				}}
			>
				<GiUpgrade size={34} />
				<h3>Promote</h3>
			</div>
			<div
				className="request__options-element"
				onClick={() => {
					setShowModal(true);
					setType("Salary");
				}}
			>
				<GiReceiveMoney size={34} />
				<h3>Increase Salary</h3>
			</div>
			<div
				className="request__options-element"
				onClick={() => {
					setShowModal(true);
					setType("Feedback");
				}}
			>
				<VscFeedback size={34} />
				<h3>Feedback</h3>
			</div>
			<Appraisal
				showModal={showModal}
				setShowModal={setShowModal}
				type={type}
				selectedId={selectedEmployee}
			/>
		</div>
	);
};

export default AppraisalOptions;
