import { useGetEmployeePerformanceData } from "@/query/appraisal";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const LeaveAnalysis = ({ selectedEmployee }: { selectedEmployee: string }) => {
	const [year, setYear] = useState(new Date().getFullYear());

	const filter = { userId: selectedEmployee, type: "leave", year: year };
	const { data, isLoading, isError } = useGetEmployeePerformanceData(filter);

	if (isLoading) <div className="loader" />;

	if (!isError || !data) <div>Error</div>;

	const totalProjectData = {
		labels: [
			"Total Leave Taken",
			"Total Paid Leave",
			"Total Unpaid Leave Taken",
		],
		datasets: [
			{
				data: [
					data?.leaveDetails?.leavesTaken,
					data?.leaveDetails?.totalPaidLeaveTaken,
					data?.leaveDetails?.totalUnpaidLeaveTaken,
				],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};

	return (
		<div className="appraisal__chart">
			<div className="appraisal__filter">
				<input
					type="text"
					placeholder="Enter Year"
					value={year}
					onChange={(e) => setYear(Number(e.target.value))}
				/>
			</div>
			<h3>Leave Matrix</h3>
			<div className="w-[500px] appraisal__chart-item">
				<Pie data={totalProjectData} />
			</div>
		</div>
	);
};

export default LeaveAnalysis;
