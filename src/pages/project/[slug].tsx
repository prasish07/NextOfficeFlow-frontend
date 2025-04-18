import Attachment from "@/components/project/Attachment";
import Comments from "@/components/project/Comments";
import Details from "@/components/project/Details";
import GitHub from "@/components/project/github/GitHub";
import LinkedTickets from "@/components/project/LinkedTickets";
import { GetServerSideProps } from "next";
import React from "react";

const ProjectDetails = ({ endpoint }: { endpoint: string }) => {
	const [activeTab, setActiveTab] = React.useState("details");

	const renderTabContent = () => {
		switch (activeTab) {
			case "details":
				return <Details endpoint={endpoint} />;
			case "comments":
				return <Comments endpoint={endpoint} />;
			case "attachments":
				return <Attachment endpoint={endpoint} />;
			case "linkedIssues":
				return <LinkedTickets endpoint={endpoint} />;
			case "GitHub":
				return <GitHub endpoint={endpoint} />;
			default:
				return null;
		}
	};

	return (
		<div className="project-id">
			<h2>Project ID: {endpoint}</h2>
			<div className="project-id__info">
				<div className="project-id__menu">
					<button
						className={
							activeTab === "details" ? "project-id__menu--active" : ""
						}
						onClick={() => setActiveTab("details")}
					>
						Project Details
					</button>
					<button
						className={
							activeTab === "comments" ? "project-id__menu--active" : ""
						}
						onClick={() => setActiveTab("comments")}
					>
						Comments
					</button>
					<button
						className={
							activeTab === "attachments" ? "project-id__menu--active" : ""
						}
						onClick={() => setActiveTab("attachments")}
					>
						Attachments
					</button>
					<button
						className={
							activeTab === "linkedIssues" ? "project-id__menu--active" : ""
						}
						onClick={() => setActiveTab("linkedIssues")}
					>
						Linked Issues
					</button>
					<button
						className={activeTab === "GitHub" ? "project-id__menu--active" : ""}
						onClick={() => setActiveTab("GitHub")}
					>
						GitHub
					</button>
				</div>
				{renderTabContent()}
			</div>
		</div>
	);
};

export default ProjectDetails;

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
