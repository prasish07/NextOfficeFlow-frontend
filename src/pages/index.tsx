import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookies } from "@/utils/cookies";
import { useLoginUserData } from "@/query/api";
import { redirectToLogIn } from "@/utils/redirect";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import DashboardInfo from "@/components/dashboardInfo";
import MenuBtn from "@/components/MenuBtn";
import useScreenWidth from "@/hooks/useScreenWidth";
// import { useCheckRoleAndToken } from "@/hooks/auth";
import { FaArrowDownLong, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useGlobalProvider } from "@/context/GlobalProvicer";

const Home = () => {
	const { role } = useGlobalProvider();
	return (
		<>
			<section className="dashboard">
				<div className="dashboard__top-part">
					<div className="dashboard__profile-info">
						<div className="dashboard__message">
							<h2>{`Good Evening, Prasish Shrestha`}</h2>
							<p>{`Monday, March 3, 2023`}</p>
						</div>
						<div className="dashboard__profile-title">
							<div>P</div>
							<h2>Prasish Shrestha</h2>
							<h3>
								Employee : <span>Team Lead</span>
							</h3>
						</div>
					</div>
					{role === "employee" && (
						<div className="dashboard__attendance">
							<h2>Time And Attendance</h2>
							<div className="dashboard__attendance-btns">
								<button>
									<FaArrowDownLong className="rotate-45 text-green-700" />
									Check-In
								</button>
								<button>
									<FaArrowDownLong className="rotate-[220deg] text-red-700" />
									Check-Out
								</button>
								<button>
									<FaPlus />
									Break
								</button>
							</div>
							<div className="dashboard__time">
								<div>
									<p>
										Status: <span>Late</span>
									</p>
									<p>
										Check-In Time: <span>09:55AM</span>
									</p>
									<p>
										Check-Out Time: <span>05:05PM</span>
									</p>
									<p>
										Location: <span>On-site</span>
									</p>
									<p>
										Total Hours: <span>8</span>
									</p>
								</div>
								<div>
									<p>
										Total Breaks: <span>1</span>
									</p>
									<p>10 Colleagues are on leave today</p>
									<Link href="">View my Attendance</Link>
								</div>
							</div>
						</div>
					)}
					{role === "HR" && (
						<div className="dashboardInfo">
							<div className="dashboardInfo__elements">
								{<DashboardInfo />}
								{<DashboardInfo />}
							</div>
							<div className="dashboardInfo__elements">
								{<DashboardInfo />}
								{<DashboardInfo />}
							</div>
						</div>
					)}
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
