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
import PhotoChange from "@/components/profile/photoChange";
import Resignation from "@/components/profile/Resignation";

const MyProfile = ({ endpoint }: { endpoint: string }) => {
	const [currentContent, setCurrentContent] = useState<string>("profile");
	const { userName, role } = useGlobalProvider();
	const isHRAdmin = role === "HR" || role === "Admin";
	const [showModel, setShowModel] = useState(false);

	const { data: userData, isLoading: userDataLoading } = useGetUserInfo();
	let userId = "";
	if (userDataLoading) {
		return <div className="loader" />;
	} else if (!userData) {
		return <div>Error</div>;
	}
	if (endpoint === "my-profile") {
		userId = userData.response._id;
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
			case "resignation":
				return <Resignation />;

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
						<div
							className="profile__left__image"
							onClick={() => {
								setShowModel(true);
							}}
						>
							{userData?.response?.employeePic ? (
								<img src={userData?.response?.employeePic} alt="profile" />
							) : (
								<p className="profile-pic">
									{userData?.response?.employeeName[0]}
								</p>
							)}
						</div>
						<h3>{userData ? userData?.response.employeeName : ""}</h3>
						<p>{userData ? userData?.response.employeePosition : ""} </p>
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
					{!isHRAdmin && (
						<button onClick={() => setCurrentContent("attendance")}>
							Attendance
						</button>
					)}
					{!isHRAdmin && (
						<button onClick={() => setCurrentContent("resignation")}>
							Resignation
						</button>
					)}
				</div>
			</div>
			<PhotoChange
				shouldShowModal={showModel && endpoint === "my-profile"}
				handleClose={() => {
					setShowModel(false);
				}}
				id={userData?.response.employeeId}
			/>
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
