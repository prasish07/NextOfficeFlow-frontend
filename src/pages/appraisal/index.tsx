import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CustomAssignee from "@/components/dropdown/customAssignee";
import CustomeAssignee2 from "@/components/dropdown/customAsignee2";
import classNames from "classnames";
import ProjectAnalysis from "@/components/appraisal/project";
import SelectEmployee from "@/components/dropdown/selectEmployee";
import TicketAnalysis from "@/components/appraisal/ticket";
import LeaveAnalysis from "@/components/appraisal/leave";
import AttendanceAnalysis from "@/components/appraisal/attendance";
import AppraisalOptions from "@/components/appraisal/options";

ChartJS.register(ArcElement, Tooltip, Legend);

const Appraisal = () => {
	const [selectedEmployee, setSelectedEmployee] = useState({
		userId: "",
		email: "",
	});
	const [activeButton, setActiveButton] = useState("project");
	const handleClick = (type: string) => {
		setActiveButton(type);
	};

	const ReturnComponent = () => {
		switch (activeButton) {
			case "project":
				return <ProjectAnalysis selectedEmployee={selectedEmployee.userId} />;
			case "ticket":
				return <TicketAnalysis selectedEmployee={selectedEmployee.userId} />;
			case "leave":
				return <LeaveAnalysis selectedEmployee={selectedEmployee.userId} />;
			case "attendance":
				return (
					<AttendanceAnalysis selectedEmployee={selectedEmployee.userId} />
				);
			case "appraisal":
				return <AppraisalOptions selectedEmployee={selectedEmployee.userId} />;
		}
	};

	return (
		<div className="appraisal">
			<h2 className="appraisal__main-title">Appraisal</h2>
			<SelectEmployee setEmployee={setSelectedEmployee}>
				<button className="appraisal__select">
					{selectedEmployee.email ? selectedEmployee.email : "Select Employee"}
				</button>
			</SelectEmployee>
			<div className="appraisal__options">
				<button
					className={classNames({ active: activeButton === "project" })}
					onClick={() => handleClick("project")}
				>
					Projects Analysis
				</button>
				<button
					className={classNames({ active: activeButton === "ticket" })}
					onClick={() => handleClick("ticket")}
				>
					Tickets Analysis
				</button>
				<button
					className={classNames({ active: activeButton === "leave" })}
					onClick={() => handleClick("leave")}
				>
					Leave Analysis
				</button>
				<button
					className={classNames({ active: activeButton === "attendance" })}
					onClick={() => handleClick("attendance")}
				>
					Attendance Analysis
				</button>
				{/* <button
					className={classNames({ active: activeButton === "review" })}
					onClick={() => handleClick("review")}
				>
					Review Analysis
				</button> */}
				<button
					className={classNames({ active: activeButton === "appraisal" })}
					onClick={() => handleClick("appraisal")}
				>
					Appraisal
				</button>
			</div>
			{selectedEmployee.userId && <ReturnComponent />}
		</div>
	);
};

export default Appraisal;
