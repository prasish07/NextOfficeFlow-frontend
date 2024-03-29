import React, { useState } from "react";
import Table from "../ticket/table";
import TicketModal from "../ticket/TicketModal";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useProjectProvider } from "@/context/projectProvider";
import classNames from "classnames";
import { useGetTicketList } from "@/query/ticket";

const LinkedTickets = ({ endpoint }: { endpoint: string }) => {
	const [selectedStatus, setSelectedStatus] = useState<string>("In-Progress");
	const { data, isLoading, isError } = useGetTicketList({
		LinkedTickets: endpoint,
	});
	const { role } = useGlobalProvider();

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	const { tickets } = data;

	const isProjectManager = role === "project manager";

	return (
		<div className="ticket__manage">
			<div className="ticket__sub-header">
				{isProjectManager && <button>Delete</button>}
				<input type="text" placeholder="Search" />
			</div>
			<hr className="my-5" />
			<div className="ticket__filter-status">
				<button
					onClick={() => {
						setSelectedStatus("all");
					}}
					className={classNames({ active: selectedStatus === "all" })}
				>
					All
				</button>
				<button
					onClick={() => setSelectedStatus("To-Do")}
					className={classNames({ active: selectedStatus === "To-Do" })}
				>
					To-Do
				</button>
				<button
					onClick={() => setSelectedStatus("In-Progress")}
					className={classNames({
						active: selectedStatus === "In-Progress",
					})}
				>
					In-Progress
				</button>
				<button
					onClick={() => setSelectedStatus("Completed")}
					className={classNames({ active: selectedStatus === "Completed" })}
				>
					Completed
				</button>
				<button
					onClick={() => setSelectedStatus("Cancelled")}
					className={classNames({ active: selectedStatus === "Cancelled" })}
				>
					Cancelled
				</button>
			</div>
			<div className="ticket__list-element">
				<Table tickets={tickets} status={selectedStatus} />
			</div>

			<TicketModal />
		</div>
	);
};

export default LinkedTickets;
