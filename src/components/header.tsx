import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { IoPersonSharp, IoLogOut } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import { toast } from "react-toastify";
import { Logout, ResponseProps } from "@/query/employee";
import Link from "next/link";

const Header = () => {
	const popupRef = React.useRef<HTMLDivElement>(null);
	const btnRef = React.useRef<HTMLDivElement>(null);

	const logoutMutate = useMutation({
		mutationFn: Logout,
		onSuccess: (data: ResponseProps) => {
			router.push("/login");
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleOpenPopup = () => {
		if (popupRef && popupRef.current)
			popupRef.current.classList.toggle("header__nav-popup--open");
	};

	const handleClosePopup = (event: MouseEvent) => {
		if (
			popupRef.current &&
			!popupRef.current.contains(event.target as Node) &&
			btnRef.current &&
			!btnRef.current.contains(event.target as Node)
		) {
			popupRef.current.classList.remove("header__nav-popup--open");
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClosePopup);
		return () => {
			document.removeEventListener("click", handleClosePopup);
		};
	}, []);

	return (
		<section className="header">
			<div className="container">
				<div className="header__contain">
					<h1 className="header__title">
						Next<span className="text-[#3498db] font-bold">Office</span>Flow
					</h1>
					<div className="header__nav">
						<ul className="header__nav-list">
							<li className="header__nav-item">
								<button>
									<IoNotifications color="grey" size={30} />
								</button>
							</li>
							<div
								className="header__nav-item header__nav-item--profile"
								onClick={handleOpenPopup}
								ref={btnRef}
							>
								<i className="header__profile-logo">
									<span>P</span>
								</i>
								<span>Prasish</span>
								<i>
									<IoIosArrowDown size={18} />
								</i>
								<div className="header__nav-popup" ref={popupRef}>
									<Link href={"/employee/my-profile/change-password"}>
										{" "}
										<FaKey />
										Change Password
									</Link>
									<Link href={"/employee/my-profile"}>
										<IoPersonSharp />
										Profile
									</Link>
									<button onClick={() => logoutMutate.mutate()}>
										<IoLogOut />
										Sign Out
									</button>
								</div>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Header;
