import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useTicketProvider } from "@/context/ticketProvider";
import { useGetTicketList } from "@/query/ticket";
import React from "react";

const CurrentOngoingTickets = () => {
	const { data, isLoading, isError } = useGetTicketList({
		isMyTickets: true,
		status: "In-Progress",
	});
	const {
		handleSelectChange,
		setSelectedId,
		setShowModal,
		setShowAssigneeModal,
		showDeleteModal,
		setShowDeleteModal,
		setType,
		deleteTicketFunction,
	} = useTicketProvider();

	if (isLoading) return <div className="loader" />;

	if (isError) return <div>Something went wrong</div>;

	return (
		<div className="dashboardEvent">
			<h2 className="event__title">Your Ongoing Ticket on Progress</h2>
			<div className="flex flex-col gap-[20px]">
				{data?.tickets.map((ticket: any) => (
					<div
						key={ticket._id}
						className="dashboardEvent__ticket"
						onClick={() => {
							setSelectedId(ticket._id);
							setType("update");
							setShowModal(true);
						}}
					>
						<h2 className="dashboardEvent__ticket-h2">{ticket.title}</h2>
						<p className="dashboardEvent__ticket-pg">
							Priority<span>{ticket.priority}</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CurrentOngoingTickets;
