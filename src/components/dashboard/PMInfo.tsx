import React from "react";
import DashboardInfo from "../dashboardInfo";
import { VscProject } from "react-icons/vsc";
import { useGetProjectCount } from "@/query/project";
import { useGetTicketList } from "@/query/ticket";
import { BiTask } from "react-icons/bi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdPaperPlane } from "react-icons/io";
import { useGetAllPMRequested, useGetAllRequests } from "@/query/request";

const PMInfo = () => {
	const { data: totalProject } = useGetProjectCount();
	const { data: totalUserCreatedTicket } = useGetTicketList({
		reporter: "me",
	});

	const totalUserCompletedTicket = totalUserCreatedTicket?.tickets.filter(
		(ticket: any) => {
			return ticket.status === "Completed";
		}
	);

	const { data: requests } = useGetAllPMRequested();

	const pendingRequest = requests?.requests?.filter((request: any) => {
		return request.status === "pending";
	});

	return (
		<div className="dashboardInfo">
			<div className="dashboardInfo__elements">
				{
					<DashboardInfo
						icon={<VscProject size={24} />}
						title="Total Projects"
						count={totalProject?.total ?? 0}
					/>
				}
				{
					<DashboardInfo
						icon={<BiTask size={24} />}
						title="Total Tickets Created"
						count={totalUserCreatedTicket?.tickets.length ?? 0}
					/>
				}
			</div>
			<div className="dashboardInfo__elements">
				{
					<DashboardInfo
						icon={<MdOutlineTaskAlt size={24} />}
						title="Completed Tickets"
						count={totalUserCompletedTicket?.length ?? 0}
					/>
				}
				{
					<DashboardInfo
						icon={<IoMdPaperPlane size={24} />}
						title="Leave/Overtime Requests"
						count={pendingRequest?.length ?? 0}
					/>
				}
			</div>
		</div>
	);
};

export default PMInfo;
