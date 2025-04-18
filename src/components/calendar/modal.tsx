import React, { useEffect } from "react";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent } from "@/query/calender";
import { toast } from "react-toastify";
import moment from "moment";

export interface CalendarProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	date: {
		startDate: string;
		endDate: string;
	};
}

const CalenderEvent = ({ showModal, setShowModal, date }: CalendarProps) => {
	const queryClient = useQueryClient();

	const [eventData, setEventData] = React.useState({
		title: "",
		type: "Holiday",
		start: date.startDate,
		end: date.endDate,
	});
	const postMutation = useMutation({
		mutationFn: addEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			setShowModal(false);
			toast.success("Event added successfully");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	useEffect(() => {
		const endDate = moment(date.endDate)
			.subtract(1, "days")
			.endOf("day")
			.format("YYYY-MM-DD");
		setEventData((prevData) => ({
			...prevData,
			start: date.startDate,
			end: endDate,
		}));
	}, [date.startDate, date.endDate]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setEventData((prevData) => {
			return { ...prevData, [name]: value };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		postMutation.mutate(eventData);
	};
	return (
		<Modal
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			size="lg"
			header={<h2>Set an event</h2>}
		>
			<form className="form__box" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label htmlFor="title">Event Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={eventData.title}
						onChange={handleChange}
						placeholder="Enter event title"
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="type">Type</label>
					<select
						name="type"
						id="type"
						value={eventData.type}
						onChange={handleChange}
					>
						<option value="event">Holiday</option>
						<option value="reminder">Company Event</option>
					</select>
				</div>
				<div className="form__box-element">
					<label htmlFor="start">Start Date</label>
					<input
						type="date"
						name="start"
						id="start"
						value={eventData.start}
						onChange={handleChange}
					/>
				</div>
				<div className="form__box-element">
					<label htmlFor="end">End Date</label>
					<input
						type="date"
						name="end"
						id="end"
						value={eventData.end}
						onChange={handleChange}
					/>
				</div>
				<button className="add-btn" type="submit">
					Add Event
				</button>
			</form>
		</Modal>
	);
};

export default CalenderEvent;
