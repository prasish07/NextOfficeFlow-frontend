import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useTicketProvider } from "@/context/ticketProvider";
import React from "react";

const Details = () => {
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const { setType, setShowModal } = useTicketProvider();
	return (
		<div className="ticket__details">
			<h2>Ticket Backlog</h2>
			{isProjectManager && (
				<button
					className="add-btn"
					onClick={() => {
						setType("add");
						setShowModal(true);
					}}
				>
					New Ticket
				</button>
			)}
		</div>
	);
};

export default Details;
