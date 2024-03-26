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
					<button
						onClick={() => setSelectedStatus("Reopen")}
						className={classNames({ active: selectedStatus === "Reopen" })}
					>
						Reopen
					</button>
				</div>
				<div className="ticket__list-element">
					<Table tickets={tickets} status={selectedStatus} />
				</div>

				<TicketModal />
			</div>
		</div>
	);
};

export default Index;
