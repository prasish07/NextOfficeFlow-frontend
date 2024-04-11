import { useGetAllRequests } from "@/query/request";
import React from "react";
import Leave from "../request/Leave";

const PendingLeaveRequest = () => {
	const { data: totalRequests } = useGetAllRequests();
	const [showLeaveModal, setShowLeaveModal] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState("");

	const pendingRequests = totalRequests?.requests.filter(
		(request: any) =>
			request.status === "pending" && request.requestType === "leave"
	);
	console.log(pendingRequests);

	return (
		<div className="dashboardEvent">
			<h2 className="event__title">Your Pending Leave Requests</h2>
			<div className="flex flex-col gap-[20px]">
				{pendingRequests?.map((request: any) => {
					console.log("request", request);

					const startDate = new Date(request.leaveId.startDate);
					const endDate = new Date(request.leaveId.endDate);

					const timeDifference = endDate.getTime() - startDate.getTime();

					let daysDifference = Math.ceil(
						timeDifference / (1000 * 60 * 60 * 24)
					);

					daysDifference = daysDifference + 1;
					return (
						<div
							key={request._id}
							className="dashboardEvent__ticket"
							onClick={() => {
								setSelectedId(request._id);
								setShowLeaveModal(true);
							}}
						>
							<h2 className="dashboardEvent__ticket-h2">
								{request.employeeName}
							</h2>
							<p className="dashboardEvent__ticket-pg">
								Total
								<span className="capitalize font-bold">
									{daysDifference} Days
								</span>
							</p>
							<p className="dashboardEvent__ticket-pg">
								PM approval
								<span className="capitalize font-bold">{request.pmStatus}</span>
							</p>
						</div>
					);
				})}
			</div>
			<Leave
				showModal={showLeaveModal}
				setShowModal={setShowLeaveModal}
				type="update"
				selectedId={selectedId}
			/>
		</div>
	);
};

export default PendingLeaveRequest;
