import AnnouncementModel from "@/components/announcement";
import DeleteModal from "@/components/model/DeleteModal";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import { deleteAnnouncement, useGetAnnouncement } from "@/query/announcement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

const Announcement: React.FC = () => {
	const [showModel, setShowModel] = useState(false);
	const [showDeleteModel, setShowDeleteModel] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [search, setSearch] = useState("");
	const [type, setType] = useState("add");
	const queryClient = useQueryClient();
	const [filter, setFilter] = useState({
		date: "",
		endDate: "",
	});
	const { data, isLoading, refetch } = useGetAnnouncement(filter);
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const isAdminOrHr = role === "admin" || role === "HR";
	let router = useRouter();

	const deleteAnnouncementMutation = useMutation({
		mutationFn: deleteAnnouncement,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["announcement"] });
			toast.success("Announcement deleted successfully");
			setShowDeleteModel(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) return <div className="loader" />;

	if (!data) return <div>No data</div>;

	let { announcements } = data;

	announcements = announcements.filter((announcement: any) => {
		return announcement.title.toLowerCase().includes(search.toLowerCase());
	});

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({
			...filter,
			[e.target.name]: e.target.value,
		});
	};

	const handleDateFilter = () => {
		if (filter.date === "" || filter.endDate === "") {
			toast.error("Please select both date range");
			return;
		}
		refetch();
	};

	return (
		<div className="announcement">
			<h2 className="announcement__main-title">Announcements</h2>
			<div className="announcement__filter">
				<div className="announcement__filter-options">
					<input
						type="text"
						placeholder="Search"
						className="announcement__search"
						value={search}
						onChange={handleSearch}
					/>
					<div className="announcement__filter--date-range">
						<input
							type="date"
							id="datepicker"
							name="date"
							value={filter.date}
							onChange={handleDateChange}
						/>
						<input
							type="date"
							id="datepicker"
							name="endDate"
							// ref={endDateValue}
							value={filter.endDate}
							onChange={handleDateChange}
						/>
						<button
							onClick={() => {
								handleDateFilter();
							}}
						>
							Filter
						</button>
					</div>
				</div>

				{isAdminOrHr && (
					<button
						onClick={() => {
							setShowModel(true);
							setType("add");
						}}
					>
						Add
					</button>
				)}
			</div>
			<hr className="mt-5 mb-5" />

			<h2>List of announcements</h2>
			<hr className="mt-5 mb-5" />

			{announcements.length ? (
				<div className="announcement__elements">
					{announcements.map((announcement: any) => {
						return (
							<div
								// href={`/announcement/${announcement._id}`}
								className="announcement__element"
								key={announcement.id}
							>
								<div
									className="w-full cursor-pointer p-[20px]"
									onClick={() => {
										router.push(`/announcement/${announcement._id}`);
									}}
								>
									<div className="announcement__element--header">
										<div className="flex gap-5">
											<h3 className="capitalize">
												- {announcement.employeeName} (
												{announcement.employeePosition})
											</h3>
											:<h3>{announcement.title}</h3>
										</div>
										<p>{announcement.date.split("T")[0]}</p>
									</div>
								</div>
								{isAdminOrHr && (
									<div className="announcement__menu">
										<button
											title="Edit"
											onClick={(e) => {
												e.stopPropagation();
												setShowModel(true);
												setType("edit");
												setSelectedId(announcement._id);
											}}
										>
											<FaRegEdit size={24} />
										</button>
										<button
											title="Delete"
											onClick={(e) => {
												e.stopPropagation();
												setShowDeleteModel(true);
												setSelectedId(announcement._id);
											}}
										>
											<FaRegTrashAlt size={24} />
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			) : (
				<div>No announcements</div>
			)}
			<AnnouncementModel
				showModel={showModel}
				setShowModel={setShowModel}
				type={type}
				selectedId={selectedId}
			/>
			<DeleteModal
				showModal={showDeleteModel}
				setShowModal={setShowDeleteModel}
				title="Delete Announcement?"
				action={() => {
					deleteAnnouncementMutation.mutate(selectedId);
				}}
			/>
		</div>
	);
};

export default Announcement;
