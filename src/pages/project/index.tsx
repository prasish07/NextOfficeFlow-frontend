import ManageAction from "@/components/project/ManageAction";
import ManageTable from "@/components/project/ManageTable";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetProjectCount, useGetProjectList } from "@/query/project";
import React, { useState } from "react";

const Index = () => {
	const { isMobileView } = useScreenWidth();
	const { data: count, isLoading: countLoading } = useGetProjectCount();
	const [selectedId, setSelectedId] = useState<string>("");
	const { role } = useGlobalProvider();

	const [currentTab, setCurrentTab] = useState("all");

	if (countLoading) {
		return <div className="loader" />;
	}

	if (!count) {
		return <div>Error</div>;
	}

	const { toDo, total, completed, onGoing, overDue, cancel } = count;

	const toggleTab = () => {
		switch (currentTab) {
			case "all":
				return (
					<ManageTable
						setSelectedId={setSelectedId}
						setCurrentTab={setCurrentTab}
						selectedId={selectedId}
					/>
				);
				break;

			case "update":
				return <ManageAction type="update" selectedId={selectedId} />;
				break;

			case "new":
				return <ManageAction type="new" selectedId={selectedId} />;
				break;

			default:
				break;
		}
	};

	return (
		<div className="project">
			<h2 className="project__main-title">Projects</h2>
			<div className="project__info">
				<div className="project__info-item">
					<h2>To Do</h2>
					<p>{toDo}</p>
				</div>
				<div className="project__info-item">
					<h2>Total</h2>
					<p>{total}</p>
				</div>
				<div className="project__info-item">
					<h2>Completed</h2>
					<p>{completed}</p>
				</div>
				<div className="project__info-item">
					<h2>On-Going</h2>
					<p>{onGoing}</p>
				</div>
				<div className="project__info-item">
					<h2>OverDue</h2>
					<p>{overDue}</p>
				</div>
				<div className="project__info-item">
					<h2>Cancel</h2>
					<p>{cancel}</p>
				</div>
			</div>

			<div className="project__details">
				<div className="project__header">
					<button
						className={`project__header-btn ${
							currentTab === "all" && "project__header-btn--active"
						}`}
						onClick={() => setCurrentTab("all")}
					>
						All Projects
					</button>
					{(role === "admin" || role === "project manager") && (
						<button
							className={`project__header-btn ${
								(currentTab === "new" || currentTab === "update") &&
								"project__header-btn--active"
							}`}
							onClick={() => setCurrentTab("new")}
						>
							New/Edit Projects
						</button>
					)}
				</div>
				{toggleTab()}
			</div>
		</div>
	);
};

export default Index;
