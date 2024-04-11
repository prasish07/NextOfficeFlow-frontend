import { useGetProjectList } from "@/query/project";
import { dateWordFormatter } from "@/utils/data";
import Link from "next/link";
import React from "react";

const CurrentProject = () => {
	const { data } = useGetProjectList({ isMyTicket: true });
	return (
		<div className="dashboardEvent">
			<h2 className="event__title">Your Projects</h2>
			<div className="flex flex-col gap-[20px]">
				{data?.projects.map((project: any) => {
					return (
						<Link
							href={`/project/${project._id}`}
							key={project._id}
							className="dashboardEvent__ticket"
						>
							<h2 className="dashboardEvent__ticket-h2">{project.title}</h2>
							<p className="dashboardEvent__ticket-pg">
								Due Date:
								<span>{dateWordFormatter(project.endDate)}</span>
							</p>
							<p className="dashboardEvent__ticket-pg">{project.status}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default CurrentProject;
