import { useUpcomingEvents } from "@/query/calender";
import React from "react";

const Events = () => {
	const { data, isLoading, isError } = useUpcomingEvents();

	if (isLoading) return <div className="loader" />;

	if (isError) return <div>Error</div>;

	const { events } = data;
	return (
		<div className="dashboardEvent">
			<h2 className="event__title">Events and Organization Calender</h2>
			{/* loop the events */}
			{events.map((event: any) => {
				const formattedStartDate = new Date(event.start).toLocaleDateString(
					"en-US",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					}
				);
				const formattedEndDate = new Date(event.end).toLocaleDateString(
					"en-US",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					}
				);
				return (
					<div key={event._id} className="event__sub-title">
						<h3>
							{event.title} - {event.type}
						</h3>
						<p>{event.description}</p>
						<p>
							{formattedStartDate} - {formattedEndDate}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Events;
