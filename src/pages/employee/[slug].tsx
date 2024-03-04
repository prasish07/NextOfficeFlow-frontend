import Profile from "@/components/profile/Profile";
import Image from "next/image";
import React, { useState } from "react";
import prasish from "@/assets/images/prasish.jpg";
import Document from "@/components/profile/Document";
import { GetServerSideProps } from "next";
import { useGetUserInfo } from "@/query/employee";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import Description from "@/components/profile/Description";
import ProfileAttendance from "@/components/attendance/profileAttendance";

const MyProfile = ({ endpoint }: { endpoint: string }) => {
	const [currentContent, setCurrentContent] = useState<string>("profile");
	const { userName } = useGlobalProvider();

	const { data: userData, isLoading: userDataLoading } = useGetUserInfo();
	let userId = "";
	if (userDataLoading) {
		return <div className="loader" />;
	} else if (!userData) {
		return <div>Error</div>;
	}
	if (endpoint === "my-profile") {
		userId = userData.details._id;
	} else {
		userId = endpoint;
	}

	const renderTabContent = () => {
		switch (currentContent) {
			case "profile":
				return <Profile userId={userId} />;
			case "documents":
				return <Document userId={userId} />;
			case "jobDescription":
				return <Description userId={userId} />;
			case "attendance":
				return <ProfileAttendance />;
			case "request":
			// return <Request />;
			case "performanceHistory":
			// return <PerformanceHistory />;V
			default:
				return null;
		}
	};

	return (
		<>
			<div className="profile">
				<div className="profile__header">
					<h2>Profile</h2>
				</div>
				<div className="profile__contents">
					<div className="profile__left">
						<div className="profile__left__image">
							<Image src={prasish} alt="profile" width={200} height={200} />
						</div>
						<h3>{userName ? userName.name : ""}</h3>
						<p>{userName ? userName.position : ""} </p>
						<div className="profile__contact">
							<h3>
								Email - <span>{userName.email ? userName.email : ""}</span>
							</h3>
							{/* <h3>
								Phone - <span>9841234567</span>
							</h3> */}
						</div>
					</div>
					<div className="profile__right">{renderTabContent()}</div>
				</div>
				<div className="profile__options">
					<h3>More Options</h3>
					<button onClick={() => setCurrentContent("profile")}>Profile</button>
					<button onClick={() => setCurrentContent("documents")}>
						Documents
					</button>
					<button onClick={() => setCurrentContent("jobDescription")}>
						Job Description
					</button>
					<button onClick={() => setCurrentContent("attendance")}>
						Attendance
					</button>
					{/* <button>Request</button>
					<button>Performance History</button> */}
				</div>
			</div>
		</>
	);
};

export default MyProfile;

export const getServerSideProps: GetServerSideProps<{
	endpoint: string;
}> = async ({ query }) => {
	const endpoint = query.slug as string;
	return {
		props: {
			endpoint,
		},
	};
};
