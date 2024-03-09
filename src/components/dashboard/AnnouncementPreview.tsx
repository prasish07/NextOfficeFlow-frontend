import { useGetAnnouncement } from "@/query/announcement";
import Link from "next/link";
import React from "react";

const AnnouncementPreview = () => {
	const { data, isLoading, refetch } = useGetAnnouncement();

	if (isLoading) return <div>Loading...</div>;

	if (!data) return <div>No data</div>;

	let { announcements } = data;

	announcements = announcements.filter((announcement: any) => {
		const endDate = new Date(announcement.endDate);
		const currentDate = new Date();
		return endDate > currentDate;
	});

	return (
		<div className="announcement__preview">
			<h2>Announcements</h2>
			{announcements.length ? (
				<div className="announcement__elements">
					{announcements.map((announcement: any) => {
						return (
							<div className="announcement__element" key={announcement.id}>
								<div className="announcement__element--header">
									<h3>{announcement.title}</h3>
								</div>
								<div
									className="announcement__element--content-wrapper"
									dangerouslySetInnerHTML={{ __html: announcement.content }}
								></div>
								<div className="announcement__element-footer">
									<h3 className="capitalize">
										- {announcement.employeeName} (
										{announcement.employeePosition})
									</h3>
									<div>
										<p>{announcement.date.split("T")[0]}</p>
										<span>--</span>
										<p>{announcement.endDate}</p>
									</div>
								</div>
								{announcements.length > 1 && <hr />}
							</div>
						);
					})}
				</div>
			) : (
				<div>No announcements</div>
			)}
			<Link
				href="/announcement"
				className="text-[#3498db] font-bold rounded-md flex hover:underline flex justify-center"
			>
				Show All
			</Link>
		</div>
	);
};

export default AnnouncementPreview;
