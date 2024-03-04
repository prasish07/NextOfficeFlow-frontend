import { useGetEmployeePerformanceData } from "@/query/appraisal";
import React from "react";
import { Pie } from "react-chartjs-2";

const ProjectAnalysis = ({
	selectedEmployee,
}: {
	selectedEmployee: string;
}) => {
	const filter = { userId: selectedEmployee, type: "project" };
	const { data, isLoading, isError } = useGetEmployeePerformanceData(filter);

	if (isLoading) <div className="loader" />;

	if (!isError || !data) <div>Error</div>;

	const totalProjectData = {
		labels: ["Total", "Completed", "Overdue", "Canceled"],
		datasets: [
			{
				data: [
					data?.totalProject,
					data?.completedProject,
					data?.overdueProject,
					data?.cancelledProject,
				],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
			},
		],
	};

	const individualProjectData = data?.ticketList.map((ticket: any) => {
		return {
			projectTitle: ticket.projectName,
			data: {
				labels: ["Total", "Completed", "Overdue", "Canceled"],
				datasets: [
					{
						data: [
							ticket.ticketCount,
							ticket.completedTicketInProject,
							ticket.overdueTicketInProject,
							ticket.cancelledTicketInProject,
						],
						backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
						hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
					},
				],
			},
		};
	});

	return (
		<div className="appraisal__chart">
			<h3>Assignee total Project Matrix</h3>
			{/* Pie chart */}
			<div className="w-[500px] appraisal__chart-item">
				<Pie data={totalProjectData} />
			</div>

			<h3 className="mt-[20px]">Individual Project Matrix</h3>
			{/* Pie chart with loop */}
			<div className="appraisal__ticket-chart">
				{individualProjectData?.map((project: any) => (
					<div key={project.projectTitle} className="w-[500px] mb-10">
						<h3>{project.projectTitle}</h3>
						<Pie data={project.data} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectAnalysis;
