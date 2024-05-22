import { useGetEmployeePerformanceData } from "@/query/appraisal";
import React from "react";
import { Pie } from "react-chartjs-2";

const TicketAnalysis = ({ selectedEmployee }: { selectedEmployee: string }) => {
	const filter = { userId: selectedEmployee, type: "ticket" };
	const { data, isLoading, isError } = useGetEmployeePerformanceData(filter);

	if (isLoading) <div className="loader" />;

	if (!isError || !data) <div>Error</div>;

	const totalTicketData = {
		labels: ["Total", "Completed", "Overdue", "Canceled"],
		datasets: [
			{
				data: [
					data?.totalTicket,
					data?.completedTicket,
					data?.overdueTicket,
					data?.cancelledTicket,
				],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
			},
		],
	};

	return (
		<div className="appraisal__chart">
			<h3>Assignee total Ticket Matrix</h3>
			<div className="xl:w-[500px] w-[300px] appraisal__chart-item">
				<Pie data={totalTicketData} />
			</div>
		</div>
	);
};

export default TicketAnalysis;
