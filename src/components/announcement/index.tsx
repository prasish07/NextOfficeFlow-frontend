import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addAnnouncement,
	updateAnnouncement,
	useGetSingleAnnouncement,
} from "@/query/announcement";
import { toast } from "react-toastify";

import { ImageResize } from "quill-image-resize-module";

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

const AnnouncementModel = ({
	showModel,
	setShowModel,
	type,
	selectedId,
}: {
	showModel: boolean;
	setShowModel: (value: boolean) => void;
	type: string;
	selectedId: number | null;
}) => {
	const [content, setContent] = useState<string>("");
	const [data, setData] = useState({
		title: "",
		date: new Date(),
		endDate: "",
		addToCalender: "yes",
	});
	const queryClient = useQueryClient();
	const {
		data: announcementData,
		isLoading,
		isError,
	} = useGetSingleAnnouncement(selectedId);

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
			["link", "image", "video"],
			["clean"],
		],
	};

	const addAnnouncementMutation = useMutation({
		mutationFn: addAnnouncement,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["announcement"] });
			toast.success("Announcement added successfully");
			setShowModel(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const updateAnnouncementMutation = useMutation({
		mutationFn: updateAnnouncement,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["announcement"] });
			toast.success("Announcement updated successfully");
			setShowModel(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleQuillChange = (value: string) => {
		setContent(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (type === "add") addAnnouncementMutation.mutate({ ...data, content });

		if (type === "edit" && selectedId) {
			updateAnnouncementMutation.mutate({ ...data, content, id: selectedId });
		}
	};

	useEffect(() => {
		if (isLoading || isError) return;

		if (!announcementData || !announcementData.announcement) return;

		const { announcement } = announcementData;

		if (type !== "add") {
			setData({
				title: announcement.title,
				date: new Date(announcement.date),
				endDate: announcement.endDate.split("T")[0],
				addToCalender: announcement.addToCalender,
			});
			setContent(announcement.content);
		}
	}, [type, announcementData, isLoading, isError]);

	return (
		<Modal
			size="lg"
			shouldShowModal={showModel}
			handleClose={() => setShowModel(false)}
			header={<h2>Announcement</h2>}
		>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form__box-element">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						className="capitalize"
						id="title"
						name="title"
						placeholder="Write title"
						value={data?.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form__box-same-line">
					<div className="form__box-element">
						<label htmlFor="date">Announcement Date</label>
						<input
							type="Date"
							id="date"
							name="date"
							value={new Date(data.date).toISOString().split("T")[0]}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form__box-element">
						<label htmlFor="endDate">End Date</label>
						<input
							type="Date"
							id="endDate"
							name="endDate"
							value={data?.endDate}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="form__box-element">
					<label htmlFor="calender">Add to Calender</label>

					<select name="addToCalender" id="yes/no" onChange={handleChange}>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="form__box-element">
					<label htmlFor="content">Content</label>
					<ReactQuill
						theme="snow"
						value={content}
						onChange={handleQuillChange}
						className="announcement__element-content"
						modules={modules}
					/>
				</div>
				<button className="btn" type="submit">
					{type === "add" ? "Add" : "Update"}
				</button>
			</form>
		</Modal>
	);
};

export default AnnouncementModel;
