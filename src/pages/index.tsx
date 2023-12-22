import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookies } from "@/utils/cookies";
import { useLoginUserData } from "@/query/api";
import { redirectToLogIn } from "@/utils/redirect";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
// import { useCheckRoleAndToken } from "@/hooks/auth";

const Home = () => {
	return (
		<>
			<Header />
			<section className="flex">
				<Navbar />
				<section>
					<div className="dashboard__profile-info">
						<div className="dashboard__message">
							<h2>{`Good Evening, Prasish Shrestha`}</h2>
							<p>{`Monday, March 3, 2023`}</p>
						</div>
						<div className="dashboard__profile-title">
							<i>P</i>
							<h2>Prasish Shrestha</h2>
							<h3>
								Admin <span>Team Lead</span>
							</h3>
						</div>
					</div>
					<div></div>
					<div></div>
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
