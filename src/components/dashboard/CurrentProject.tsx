import { useGetProjectList } from "@/query/project";
import { dateWordFormatter } from "@/utils/data";
import Link from "next/link";
import React from "react";

const CurrentProject = () => {
	const { data } = useGetProjectList({ isMyTicket: true });

	const filterProject = data?.projects
		.filter((project: any) => project.status === "To-Do")
		.sort((a: any, b: any) => {
			const dueDateA = new Date(a.dueDate);
			const dueDateB = new Date(b.dueDate);
			return dueDateA.getTime() - dueDateB.getTime();
		})
		.slice(0, 3);

	return (
		<div className="dashboardEvent">
			<h2 className="event__title">Your To-Do Projects</h2>
			<div className="flex flex-col gap-[20px]">
				{filterProject?.map((project: any) => {
					return (
						<Link
							href={`/project/${project._id}`}
							key={project._id}
							className="dashboardEvent__ticket"
						>
							<h2 className="dashboardEvent__ticket-h2">{project.title}</h2>
							<p className="dashboardEvent__ticket-pg">
								<span className="flex flex-col items-center">
									Due: <span>{dateWordFormatter(project.endDate)}</span>
								</span>
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default CurrentProject;
