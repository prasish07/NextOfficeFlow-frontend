import React, { useState } from "react";
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
import { useGlobalProvider } from "@/context/GlobalProvicer";
import { COMPANY_LOCATION, API } from "@/constants/consts";
import { calculateDistance } from "@/utils/location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { checkIn, checkOut, useMyTodayAttendance } from "@/query/attendance";
import { useGetMyDetails } from "@/query/employee";
import Events from "@/components/dashboard/Events";

const Home = () => {
	const { role } = useGlobalProvider();
	const { data: myAttendance } = useMyTodayAttendance();
	const { data, isLoading } = useGetMyDetails();
	let timeDifferenceInHours = "";
	const queryClient = useQueryClient();

	const { attendance: attendanceDate } = myAttendance || {};
	const checkInDate = attendanceDate?.checkIn;
	const checkOutDate = attendanceDate?.checkOut;

	if (checkInDate && checkOutDate) {
		const checkInDateTime = new Date(checkInDate);
		const checkOutDateTime = new Date(checkOutDate);
		const timeDifferenceInMilliseconds =
			checkOutDateTime.getTime() - checkInDateTime.getTime();
		timeDifferenceInHours = (
			timeDifferenceInMilliseconds /
			(1000 * 60 * 60)
		).toFixed(3);
	}

	const formattedCheckInDate = new Date(checkInDate).toLocaleTimeString(
		"en-US",
		{
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}
	);

	const formattedCheckOutDate = new Date(checkOutDate).toLocaleTimeString(
		"en-US",
		{
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}
	);

	const checkInMutation = useMutation({
		mutationFn: checkIn,
		onSuccess: () => {
			toast.success("Check-in successful");
			queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const checkOutMutation = useMutation({
		mutationFn: checkOut,
		onSuccess: () => {
			toast.success("Check-out successful");
			queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleCheckInClick = async () => {
		// Check if geolocation is supported by the browser
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					console.log(`User location: ${latitude}, ${longitude}`);
					const data = {
						lat: latitude,
						lng: longitude,
					};

					try {
						const response = await fetch(
							`https://api.opencagedata.com/geocode/v1/json?key=${API}&q=${latitude}+${longitude}&pretty=1`
						);

						if (!response.ok) {
							throw new Error("Failed to fetch location data");
						}

						const data = await response.json();

						if (data.results.length > 0) {
							console.log(data);
							// const city = data.results[0].components.city;
							const city =
								data.results[0].components.county +
								", " +
								data.results[0].components.suburb;
							console.log(`User is in ${city}`);
							const location = city;
							let type = "";

							const distance = calculateDistance(
								latitude,
								longitude,
								COMPANY_LOCATION.lat,
								COMPANY_LOCATION.lng
							);

							console.log(`Distance from company location: ${distance} km`);

							if (distance <= 0.5) {
								console.log(
									"User is located within 500m of the company location"
								);
								type = "onsite";
							} else {
								console.log(
									"User is located more than 500m away from the company location"
								);
								type = "remote";
							}
							checkInMutation.mutate({
								type,
								location,
								data,
							});
						} else {
							console.error("No location data found");
						}
					} catch (error: any) {
						console.error("Error getting user location:", error.message);
					}
				},
				(error) => {
					console.error("Error getting user location:", error.message);
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};

	const todayFormattedDate = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

	const handleCheckOutClick = () => {
		checkOutMutation.mutate({});
	};

	if (isLoading) return <div className="loader" />;

	const { data: employeeData } = data;

	return (
		<>
			<section className="dashboard">
				<div className="dashboard__top-part">
					<div className="dashboard__profile-info">
						<div className="dashboard__message">
							<h2>{`Good Evening, ${employeeData.name}`}</h2>
							<p>{todayFormattedDate}</p>
						</div>
						<div className="dashboard__profile-title">
							<div>{employeeData.name[0]}</div>
							<h2>{employeeData.name}</h2>
							<h3 className="capitalize">
								{employeeData.userId.role} ---{" "}
								<span>{employeeData.position}</span>
							</h3>
						</div>
					</div>
					{role === "employee" && (
						<div className="dashboard__attendance">
							<h2>Time And Attendance</h2>
							<div className="dashboard__attendance-btns">
								<button onClick={handleCheckInClick}>
									<FaArrowDownLong className="rotate-45 text-green-700" />
									Check-In
								</button>
								<button onClick={handleCheckOutClick}>
									<FaArrowDownLong className="rotate-[220deg] text-red-700" />
									Check-Out
								</button>
								{/* <button>
									<FaPlus />
									Break
								</button> */}
							</div>
							<div className="dashboard__time">
								<div>
									<p>
										Status:{" "}
										<span className="capitalize">{attendanceDate?.status}</span>
									</p>
									<p>
										Check-In Time:{" "}
										<span>
											{attendanceDate?.checkIn
												? formattedCheckInDate
												: "Unknown"}
										</span>
									</p>
									<p>
										Check-Out Time:{" "}
										<span>
											{attendanceDate?.checkOut
												? formattedCheckOutDate
												: "Unknown"}
										</span>
									</p>
									<p>
										Type:{" "}
										<span className="capitalize">
											{attendanceDate?.type ? attendanceDate?.type : "Unknown"}
										</span>
									</p>
									<p>
										Total Hours:{" "}
										<span>
											{!!timeDifferenceInHours
												? `${timeDifferenceInHours} hours`
												: "Calculate after check-out"}
										</span>
									</p>
								</div>
								<div>
									<p>
										Location:{" "}
										<span>
											{attendanceDate?.location
												? attendanceDate?.location
												: "Unknown"}
										</span>
									</p>
									{/* <p>
										Total Breaks: <span>1</span>
									</p>
									<p>10 Colleagues are on leave today</p> */}
									{/* <Link href="">View my Attendance</Link> */}
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
				{/* <div className="dashboardEvent">
					<h2 className="event__title">Events and Organization Calender</h2>
					<div className="event__info">
						<i className="event__icon">p</i>
						<div className="event__sub-title">
							<h3>Dashain</h3>
							<p>25 Falgun 2070</p>
						</div>
					</div>
				</div> */}
				<Events />
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
