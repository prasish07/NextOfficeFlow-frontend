import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useGetUserDetails } from "@/query/employee";
import React, { useEffect } from "react";

const Document = ({ userId }: { userId: string }) => {
	const { data, isLoading } = useGetUserDetails({ userId });
	const { setUserName } = useGlobalProvider();

	useEffect(() => {
		if (data) {
			console.log(data);
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
			<h2>Documents</h2>
			<div className="profile__documents">
				{details.documents.map((image: any, index: any) => {
					return (
						<a href={image} key={index}>
							<img src={image} alt="image" />
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Document;
