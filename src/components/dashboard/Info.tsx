import React from "react";
import DashboardInfo from "../dashboardInfo";
import { FiUser, FiUsers, FiSend, FiHome } from "react-icons/fi";
import {
	useGetTotalTodayAttendance,
	useGetUnCheckEmployees,
} from "@/query/attendance";
import { useGetAllEmployees } from "@/query/employee";
import { useGetAllRequests } from "@/query/request";

const Info = () => {
	const { data: totalAttendance } = useGetTotalTodayAttendance();
	const { data: totalEmployee } = useGetAllEmployees();
	const { data: totalRequests } = useGetAllRequests();
	const { data: unCheckedEmployee } = useGetUnCheckEmployees();

	const totalPendingRequests =
		totalRequests?.requests.filter(
			(request: any) => request.status === "pending"
		).length ?? 0;

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
						title="Pending Requests"
						count={totalPendingRequests}
					/>
				}
				{
					<DashboardInfo
						icon={<FiHome size={24} />}
						title="Unchecked Employees"
						count={unCheckedEmployee?.uncheckedEmployees.length ?? 0}
					/>
				}
			</div>
		</div>
	);
};

export default Info;
