import Profile from "@/components/profile/Profile";
import Image from "next/image";
import React, { useState } from "react";
import prasish from "@/assets/images/prasish.jpg";

const MyProfile = () => {
	const [currentContent, setCurrentContent] = useState("profile");

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
						<h3>Prasish Shrestha</h3>
						<p>Software Development</p>
						<div className="profile__contact">
							<h3>
								Email - <span>PrasishShrestha0099@gmail.com</span>
							</h3>
							<h3>
								Phone - <span>9841234567</span>
							</h3>
						</div>
					</div>
					<div className="profile__right">
						<Profile />
					</div>
				</div>
				<div className="profile__options">
					<h3>More Options</h3>
					<button>Profile</button>
					<button>Request</button>
					<button>Attendance</button>
					<button>Leave</button>
					<button>Documents</button>
					<button>Job Description</button>
					<button>Performance History</button>
				</div>
			</div>
		</>
	);
};

export default MyProfile;
