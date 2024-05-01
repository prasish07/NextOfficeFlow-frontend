import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useGetUserDetails } from "@/query/employee";
import { dateWordFormatter } from "@/utils/data";
import React, { useEffect } from "react";

const Profile = ({ userId }: { userId: string }) => {
	const { data, isLoading } = useGetUserDetails({ userId });
	const { setUserName } = useGlobalProvider();

	useEffect(() => {
		if (data) {
			setUserName({
				name: data.data.name,
				email: data.data.userId.email,
				position: data.data.position,
			});
		}
	}, [data, setUserName]);
	if (isLoading) {
		return <div className="loader" />;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const { data: details } = data;

	return (
		<div className="profile__details">
			<h2>Job Information</h2>
			<div className="profile__details--element">
				<div>
					<p>
						<span>Position :</span>
						{details.position}
					</p>
					<p>
						<span>Department:</span>
						{details.department}{" "}
					</p>
					<p>
						<span>Team:</span>
						{details.team}
					</p>
					<p>
						<span>Supervisor:</span>
						{details.manager}
					</p>
					<p>
						<span>Start Date:</span>
						{dateWordFormatter(details.startDate)}
					</p>
					<p>
						<span>End Date:</span>
						{dateWordFormatter(details.endDate)}
					</p>
					<p>
						<span>Salary:</span>
						{details.salary}
					</p>
					<p>
						<span>Salary Type:</span>Monthly
					</p>
					<p>
						<span>Status: </span>
						{details.status}
					</p>
					<p>
						<span>Working Hours:</span>Mon - Fri, {details.from} to {details.to}
					</p>
				</div>

				<div>
					<p>
						<span>Total paid leaves:</span> {details.availableLeaves}
					</p>
					<p>
						<span>Total paid leaves taken:</span> {details.totalPaidLeaveTaken}
					</p>
					<p>
						<span>Total unpaid leaves taken:</span>{" "}
						{details.totalUnpaidLeaveTaken}
					</p>
					<p>
						<span>Total leaves taken:</span> {details.leavesTaken}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
