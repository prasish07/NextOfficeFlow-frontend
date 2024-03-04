import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { IoPersonSharp, IoLogOut } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import { toast } from "react-toastify";
import { Logout, ResponseProps } from "@/query/employee";
import Link from "next/link";
import { Modal } from "./model/Model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { changePassword } from "@/query/api";

const passwordSchema = z
	.object({
		password: z.string(),
		newPassword: z
			.string()
			.min(6)
			.max(20)
			.refine((value) => /[0-9]/.test(value), {
				message: "New password must contain at least one number",
			})
			.refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
				message: "New password must contain at least one special character",
			}),
		confirmPassword: z.string().min(8).max(20),
	})
	.refine(
		(date) => {
			return date.newPassword === date.confirmPassword;
		},
		{ message: "Passwords do not match", path: ["confirmPassword"] }
	);

type TPasswordSchema = z.infer<typeof passwordSchema>;

const Header = () => {
	const popupRef = React.useRef<HTMLDivElement>(null);
	const btnRef = React.useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(false);
	// Inside your functional component
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		reset,
	} = useForm<TPasswordSchema>({
		resolver: zodResolver(passwordSchema),
	});
	const mutationChangePassword = useMutation({
		mutationFn: changePassword,
		onSuccess: (data: ResponseProps) => {
			toast.success(data.message);
			setShowModal(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

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

	const onSubmit = (data: TPasswordSchema) => {
		mutationChangePassword.mutate({ ...data });
	};

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
									<button onClick={() => setShowModal(true)}>
										{" "}
										<FaKey />
										Change Password
									</button>
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
			<Modal
				size="sm"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header="Change Password"
			>
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="employee__form-2">
							<div className="employee__form-item">
								<div className="employee__form-item--group">
									<label htmlFor="password">Old Password</label>
									<div className="password-input">
										<input
											type={showPassword ? "text" : "password"}
											{...register("password")}
											id="password"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? "Hide" : "Show"}
										</button>
									</div>
									{errors.password && (
										<p className="text-red-500">{`${errors.password.message}`}</p>
									)}
								</div>
								<div className="employee__form-item--group">
									<label htmlFor="newPassword">New Password</label>
									<div className="password-input">
										<input
											type={showNewPassword ? "text" : "password"}
											{...register("newPassword")}
											id="newPassword"
										/>
										<button
											type="button"
											onClick={() => setShowNewPassword(!showNewPassword)}
										>
											{showNewPassword ? "Hide" : "Show"}
										</button>
									</div>
									{errors.newPassword && (
										<p className="text-red-500">{`${errors.newPassword.message}`}</p>
									)}
								</div>
								<div className="employee__form-item--group">
									<label htmlFor="confirmPassword">Confirm Password</label>
									<div className="password-input">
										<input
											type={showConfirmPassword ? "text" : "password"}
											{...register("confirmPassword")}
											id="confirmPassword"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? "Hide" : "Show"}
										</button>
									</div>
									{errors.confirmPassword && (
										<p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
									)}
								</div>
							</div>
						</div>
						<div className="employee__form-add justify-end">
							<button type="submit">Change</button>
						</div>
					</form>
					<div></div>
				</>
			</Modal>
		</section>
	);
};

export default Header;
