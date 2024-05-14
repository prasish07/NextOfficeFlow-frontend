import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useGetUserDetails } from "@/query/employee";
import React, { useEffect } from "react";

const Description = ({ userId }: { userId: string }) => {
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
			<div className="profile__description">
				<p>{details.description}</p>
			</div>
		</div>
	);
};

export default Description;
