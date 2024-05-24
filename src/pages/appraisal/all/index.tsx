import AppraisalView from "@/components/appraisal/appraisalView";
import SelectEmployee from "@/components/dropdown/selectEmployee";
import { useGetAllAppraisalHistory } from "@/query/appraisal";
import React, { useState } from "react";
import { GiUpgrade, GiReceiveMoney } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";

const AppraisalHistoryAll = () => {
	const [selectedType, setSelectedType] = useState("promotion");
	const [selectedId, setSelectedId] = useState("");
	const activeClass = "active";
	const [showModal, setShowModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState({
		userId: "",
		email: "",
	});
	const [year, setYear] = useState(new Date().getFullYear());

	const { data } = useGetAllAppraisalHistory({
		userId: selectedEmployee.userId,
		year,
	});

	const { appraisalHistory } = data ? data : { appraisalHistory: [] };

	const filterElement = appraisalHistory.filter(
		(item: any) => item.type === selectedType
	);

	const AppraisalList = () => {
		if (selectedType === "promotion") {
			return filterElement.map((item: any) => {
				const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setSelectedId(item._id);
							setShowModal(true);
							setSelectedType(item.type);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<GiUpgrade size={30} />
								<h3 className="capitalize">{item.type}</h3>
							</div>
							<div className="request__list-element-footer">
								<h3 className="font-bold">{formattedDate}</h3>
							</div>
						</div>
					</div>
				);
			});
		} else if (selectedType === "salary increase") {
			return filterElement.map((item: any) => {
				const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
				return (
					<div
						className="request__list-element"
						key={item._id}
						onClick={() => {
							setSelectedId(item._id);
							setShowModal(true);
							setSelectedType(item.type);
						}}
					>
						<div className="request__list-element-1-header">
							<h2>{item.employeeName}</h2>
							<p>{item.employeePosition}</p>
						</div>
						<div className="request__list-element-2">
							<div className="request__list-element-header">
								<GiReceiveMoney size={30} />
								<h3 className="capitalize">{item.type}</h3>
							</div>
							<div className="request__list-element-footer">
								<h3 className="font-bold">{formattedDate}</h3>
							</div>
						</div>
					</div>
				);
			});
		}
		return filterElement.map((item: any) => {
			const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
			return (
				<div
					className="request__list-element"
					key={item._id}
					onClick={() => {
						setSelectedId(item._id);
						setShowModal(true);
						setSelectedType(item.type);
					}}
				>
					<div className="request__list-element-1-header">
						<h2>{item.employeeName}</h2>
						<p>{item.employeePosition}</p>
					</div>
					<div className="request__list-element-2">
						<div className="request__list-element-header">
							<VscFeedback size={30} />
							<h3 className="capitalize">{item.type}</h3>
						</div>
						<div className="request__list-element-footer">
							<h3 className="font-bold">{formattedDate}</h3>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="appraisal">
			<h2 className="appraisal__main-title">Appraisal History</h2>
			<hr className="mb-5" />
			<SelectEmployee setEmployee={setSelectedEmployee}>
				<button className="appraisal__select">
					{selectedEmployee.email ? selectedEmployee.email : "Select Employee"}
				</button>
			</SelectEmployee>
			<div className="appraisal__filter">
				<input
					type="text"
					placeholder="Enter Year"
					value={year}
					onChange={(e) => setYear(Number(e.target.value))}
				/>
			</div>
			<div className="request__my-options">
				<div
					className={`request__my-options-element ${
						selectedType === "promotion" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("promotion")}
				>
					<h3>Promotion</h3>
				</div>
				<div
					className={`request__my-options-element ${
						selectedType === "salary increase" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("salary increase")}
				>
					<h3>Increase Salary</h3>
				</div>
				<div
					className={`request__my-options-element ${
						selectedType === "feedback" ? activeClass : ""
					}`}
					onClick={() => setSelectedType("feedback")}
				>
					<h3>Feedback</h3>
				</div>
			</div>
			<div className="request__list">{<AppraisalList />}</div>
			<AppraisalView
				showModal={showModal}
				setShowModal={setShowModal}
				type={selectedType}
				selectedId={selectedId}
			/>
		</div>
	);
};

export default AppraisalHistoryAll;
