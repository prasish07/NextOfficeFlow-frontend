import React, { useRef, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalenderEvent from "@/components/calendar/modal";
import {
	deleteEvent,
	useGetEvents,
	useGetEventsWithoutFilter,
} from "@/query/calender";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DeleteModal from "@/components/model/DeleteModal";
import { useGlobalProvider } from "@/context/GlobalProvicer";

const App: React.FC = () => {
	const [weekendsVisible, setWeekendsVisible] = useState(true);
	const [currentEvents, setCurrentEvents] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [date, setDate] = useState({ startDate: "", endDate: "" });
	const displayedDateRef = useRef({
		start: new Date(),
		end: new Date(),
	});
	const queryClient = useQueryClient();
	const [selectedId, setSelectedId] = useState<string>("");
	const filter = {
		start: displayedDateRef.current.start.toISOString(),
		end: displayedDateRef.current.end.toISOString(),
	};
	const { role } = useGlobalProvider();

	const { data, isLoading, isError } = useGetEvents(filter);

	const {
		data: withoutFilters,
		isLoading: withoutFiltersLoading,
		isError: withoutFiltersError,
	} = useGetEventsWithoutFilter();

	const deleteMutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			setShowDeleteModal(false);
			toast.success("Event deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["events", filter] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (withoutFiltersLoading) return <div className="loader" />;

	if (withoutFiltersError) return <div>Error</div>;

	const { events } = data || {};

	const { events: eventsWithoutFilters } = withoutFilters;

	console.log(events);

	const handleWeekendsToggle = () => {
		setWeekendsVisible((prev) => !prev);
	};

	const handleDateSelect = (selectInfo: any) => {
		setShowModal(true);
		setDate({ startDate: selectInfo.startStr, endDate: selectInfo.endStr });
	};

	const handleEventClick = (clickInfo: any) => {
		// if (
		// 	confirm(
		// 		`Are you sure you want to delete the event '${clickInfo.event.title}'`
		// 	)
		// ) {
		// 	clickInfo.event.remove();
		// }
		// console.log(clickInfo.event.extendedProps._id);
		setSelectedId(clickInfo.event.extendedProps._id);
		setShowDeleteModal(true);
	};

	const handleEvents = (events: any) => {
		setCurrentEvents(events);
	};

	const renderEventContent = (eventInfo: any) => (
		<>
			<i>{eventInfo.event.title}</i>
		</>
	);

	const renderSidebarEvent = (event: any) => (
		<li key={event.id}>
			<b>
				{formatDate(event.start, {
					year: "numeric",
					month: "short",
					day: "numeric",
				})}
			</b>
			<i>{event.title}</i>
		</li>
	);

	return (
		<div className="calendar">
			{renderSidebar()}
			<div className="calendar__view">
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					initialView="dayGridMonth"
					editable={true}
					selectable={true}
					selectMirror={true}
					dayMaxEvents={true}
					weekends={weekendsVisible}
					initialEvents={eventsWithoutFilters}
					select={role !== "employee" ? handleDateSelect : undefined}
					eventContent={renderEventContent}
					eventClick={handleEventClick}
					eventsSet={handleEvents}
					datesSet={(dateInfo) => {
						displayedDateRef.current = {
							start: new Date(dateInfo.startStr),
							end: new Date(dateInfo.endStr),
						};
					}}
				/>
			</div>
		</div>
	);

	function renderSidebar() {
		return (
			<div className="calendar__section">
				<div className="calendar__section-element">
					<h2>Event List</h2>
				</div>
				<div className="calendar__section-element">
					<label className="checkbox-label">
						<input
							type="checkbox"
							checked={weekendsVisible}
							onChange={handleWeekendsToggle}
						></input>
						Toggle weekends
					</label>
					{role !== "employee" && (
						<button
							onClick={() => {
								setShowModal(true);
							}}
						>
							Add Event
						</button>
					)}
				</div>
				<div className="calendar__section-events">
					<h2>All Events ({events?.length})</h2>
					<ul>{events?.map(renderSidebarEvent)}</ul>
				</div>
				<CalenderEvent
					showModal={showModal}
					setShowModal={setShowModal}
					date={date}
				/>
				<DeleteModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					action={() => {
						deleteMutation.mutate(selectedId);
					}}
					title="Are you sure you want to delete this event?"
				/>
			</div>
		);
	}
};

export default App;
