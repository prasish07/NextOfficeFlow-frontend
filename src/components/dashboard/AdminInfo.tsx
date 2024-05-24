import React from "react";
import DashboardInfo from "../dashboardInfo";
import { FiUser, FiUsers, FiSend, FiHome } from "react-icons/fi";
import { useGetTotalTodayAttendance } from "@/query/attendance";
import { useGetAllEmployees } from "@/query/employee";
import { useGetProjectCount } from "@/query/project";
import { useGetAllAppraisalHistory } from "@/query/appraisal";

const Info = () => {
	const { data: totalAttendance } = useGetTotalTodayAttendance();
	const { data: totalEmployee } = useGetAllEmployees();
	const { data: totalProject } = useGetProjectCount();
	const { data: appraisal } = useGetAllAppraisalHistory({ year: 2024 });

	const totalEmployeeCount = totalEmployee?.data.length ?? 0;

	return (
		<div className="dashboardInfo">
			<div className="dashboardInfo__elements">
				{
					<DashboardInfo
						icon={<FiUser size={24} />}
						title="Active Employee"
						count={totalAttendance?.totalAttendance ?? 0}
					/>
				}
				{
					<DashboardInfo
						icon={<FiUsers size={24} />}
						title="Total Employee"
						count={totalEmployeeCount}
					/>
				}
			</div>
			<div className="dashboardInfo__elements">
				{
					<DashboardInfo
						icon={<FiSend size={24} />}
						title="Total Projects"
						count={totalProject?.total ?? 0}
					/>
				}
				{
					<DashboardInfo
						icon={<FiHome size={24} />}
						title="This Year Total Appraisal"
						count={appraisal?.appraisalHistory.length ?? 0}
					/>
				}
			</div>
		</div>
	);
};

export default Info;
