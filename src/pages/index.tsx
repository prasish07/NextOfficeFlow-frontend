import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookies } from "@/utils/cookies";
import { useLoginUserData } from "@/query/api";
import { redirectToLogIn } from "@/utils/redirect";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import DashboardInfo from "@/components/dashboardInfo";
// import { useCheckRoleAndToken } from "@/hooks/auth";

const Home = () => {
	return (
		<>
			<Header />
			<section className="flex w-[100%]">
				<Navbar />
				<section className="dashboard">
					<div className="dashboard__top-part flex justify-between">
						<div className="dashboard__profile-info">
							<div className="dashboard__message">
								<h2>{`Good Evening, Prasish Shrestha`}</h2>
								<p>{`Monday, March 3, 2023`}</p>
							</div>
							<div className="dashboard__profile-title">
								<div>P</div>
								<h2>Prasish Shrestha</h2>
								<h3>
									Admin <span>Team Lead</span>
								</h3>
							</div>
						</div>
						<div className="dashboardInfo">
							{<DashboardInfo />}
							{<DashboardInfo />}
						</div>
					</div>
					<div className="dashboardEvent">
						<h2 className="event__title">Events and Organization Calender</h2>
						<div className="event__info">
							<i className="event__icon">p</i>
							<div className="event__sub-title">
								<h3>Dashain</h3>
								<p>25 Falgun 2070</p>
							</div>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Home;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const redirect = redirectToLogIn(context);

	if (redirect) {
		return redirect;
	}

	return {
		props: {},
	};
};
