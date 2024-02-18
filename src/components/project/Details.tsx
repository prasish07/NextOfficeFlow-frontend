import { useGetProjectDetails } from "@/query/project";
import React from "react";

const Details = ({ endpoint }: { endpoint: string }) => {
	const { data, isLoading, isError } = useGetProjectDetails({ endpoint });

	if (isLoading) {
		return <div className="loader" />;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const { project } = data;
	const startDate = new Date(project.startDate);
	const formattedStartDate = startDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const formattedEndDate = new Date(project.endDate).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		}
	);
	return (
		<div className="project-id__details">
			<div className="project-id__details--header">
				<h3>Project Details</h3>
				<button>Edit</button>
			</div>
			<div className="project-id__details--info">
				<div className="project-id__details--info-item">
					<h3>Project Id:</h3>
					<p>{project._id}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Project Name:</h3>
					<p>{project.title}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Start Date:</h3>
					<p>{formattedStartDate}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>End Date:</h3>
					<p>{formattedEndDate}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Assigned To:</h3>
					{project.AssigneeId.map((item: any) => {
						return (
							<div key={item.id} className="project__manage-info--avatar ml-2">
								<span
									className="w-[30px] h-[30px] rounded-[50%] bg-[#bcbcf3] text-[#5a4e4e] flex justify-center items-center font-bold cursor-pointer capitalize"
									title={item.email}
								>
									{item.email[0]}
								</span>
							</div>
						);
					})}
				</div>
				<div className="project-id__details--info-item">
					<h3>Status:</h3>
					<p>{project.status}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Description:</h3>
					<p>{project.Description}</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Estimated Time:</h3>
					<p>
						{project.estimatedTime
							? project.estimatedTime + " hours"
							: "Not provided"}{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Details;
