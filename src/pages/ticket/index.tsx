import React, { useState } from "react";
import { useGetTicketList } from "@/query/ticket";
import TicketModal from "@/components/ticket/TicketModal";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import TicketProvider from "@/context/ticketProvider";
import classNames from "classnames";
import Table from "@/components/ticket/table";
import Details from "@/components/ticket/details";

const Index = () => {
	const [selectedStatus, setSelectedStatus] = useState<string>("in-progress");

	const { data, isLoading, isError } = useGetTicketList();
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";

	if (isLoading) {
		return <div className="loader" />;
	}

	if (isError || !data) {
		return <div>Error</div>;
	}

	const { tickets } = data;

	return (
		<TicketProvider>
			<div className="ticket">
				<h2 className="ticket__main-title">Tickets</h2>
				<Details />
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
							onClick={() => setSelectedStatus("to-do")}
							className={classNames({ active: selectedStatus === "to-do" })}
						>
							To-Do
						</button>
						<button
							onClick={() => setSelectedStatus("in-progress")}
							className={classNames({
								active: selectedStatus === "in-progress",
							})}
						>
							In-Progress
						</button>
						<button
							onClick={() => setSelectedStatus("complete")}
							className={classNames({ active: selectedStatus === "complete" })}
						>
							Completed
						</button>
						<button
							onClick={() => setSelectedStatus("cancelled")}
							className={classNames({ active: selectedStatus === "cancelled" })}
						>
							Cancelled
						</button>
					</div>
					<div className="ticket__list-element">
						<Table tickets={tickets} status={selectedStatus} />
					</div>

					<TicketModal />
				</div>
			</div>
		</TicketProvider>
	);
};

export default Index;
