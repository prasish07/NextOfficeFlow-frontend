import { useGetEmployeePerformanceData } from "@/query/appraisal";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const AttendanceAnalysis = ({
	selectedEmployee,
}: {
	selectedEmployee: string;
}) => {
	const [year, setYear] = useState(new Date().getFullYear());
	const filter = { userId: selectedEmployee, type: "attendance", year: year };
	const { data, isLoading, isError } = useGetEmployeePerformanceData(filter);

	if (isLoading) <div className="loader" />;

	if (!isError || !data) <div>Error</div>;

	if (!data || !data?.attendanceDetails) {
		return <div>No attendance data found</div>;
	}

	const { attendanceDetails } = data;

	const monthData = data?.attendanceDetails?.map((data: any) => {
		return data.monthAttendance;
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Attendance Matrix",
			},
		},
	};

	const labels = monthData;

	const dataAttendance = {
		labels: labels,
		datasets: [
			{
				label: "total",
				data: attendanceDetails.map((data: any) => data?.total),
				backgroundColor: "rgb(255, 205, 86)",
			},
			{
				label: "Present",
				data: attendanceDetails.map((data: any) => data?.present),
				backgroundColor: "rgb(54, 162, 235)",
			},
			{
				label: "Absent",
				data: attendanceDetails.map((data: any) => data?.absent),
				backgroundColor: "rgb(225, 99, 12)",
			},
			{
				label: "Remote",
				data: attendanceDetails.map((data: any) => data?.remote),
				backgroundColor: "rgb(255, 159, 132)",
			},
			{
				label: "Onsite",
				data: attendanceDetails.map((data: any) => data?.onsite),
				backgroundColor: "rgb(25, 99, 12)",
			},
			{
				label: "Late",
				data: attendanceDetails.map((data: any) => data?.late),
				backgroundColor: "rgb(55, 99, 132)",
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
			<h3>Attendance Matrix</h3>
			<div className="w-[800px] appraisal__chart-item">
				<Bar data={dataAttendance} options={options} />
			</div>
		</div>
	);
};

export default AttendanceAnalysis;
