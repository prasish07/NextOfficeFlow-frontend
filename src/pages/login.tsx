import useCheckScreenWidth from "@/hooks/useCheckScreenWidth";
import {
	LoginData,
	LoginResponse,
	googleLoginUser,
	loginUser,
	useLoginUserData,
} from "@/query/api";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import bg from "@/assets/background/office.svg";
import Image from "next/image";
import Link from "next/link";
import { googleUrl } from "@/constants/apis";
import { useRouter } from "next/router";
// import { useUserContext } from "@/context/UserProvider";
import { setCookies } from "@/utils/cookies";
import { GetServerSidePropsContext } from "next";

declare global {
	interface Window {
		handleGoogleSubmit: (response: any) => Promise<void>;
	}
}

const Login = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const { isDesktopView } = useCheckScreenWidth();

	const navigate = (url: string) => {
		window.location.href = url;
	};

	const mutateData = useMutation({
		mutationFn: loginUser,
		onSuccess: (data: LoginResponse) => {
			router.push("/");
			toast.success(data.message);
			setCookies("role", data.role, 1);
			setCookies("UserId", data.userId, 1);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const googleMutateData = useMutation({
		mutationFn: googleLoginUser,
		onSuccess: (data: LoginResponse) => {
			router.push("/");
			toast.success(data.message);
			setCookies("role", data.role, 1);
			setCookies("UserId", data.userId, 1);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutateData.mutate(userData);
	};

	useEffect(() => {
		window.handleGoogleSubmit = async (response: any) => {
			googleMutateData.mutate({ tokens: response.credential });
		};
	}, [googleMutateData]);

	return (
		<>
			<div className="container">
				<div className="login">
					<div className="login__contain">
						<h1 className="login__title">
							Next<span className="text-[#3498db] font-bold">Office</span>Flow
						</h1>
						<div className="login__form">
							<div className="subtitle">
								<h2>Log In</h2>
								<p className="mt-[17px] text-gray-500">
									Unlock full potential of office!!
								</p>
							</div>
							<form
								method="post"
								onSubmit={(e) => {
									handleSubmit(e);
								}}
								className="form"
							>
								<div className="form__item">
									{/* <label htmlFor="email">Email</label> */}
									<input
										type="email"
										name="email"
										id="email"
										placeholder="Email Address"
										onChange={handleChange}
									/>
								</div>
								<div className="form__item">
									{/* <label htmlFor="password">Password</label> */}
									<input
										type="password"
										name="password"
										id="password"
										placeholder="Enter Password"
										onChange={handleChange}
									/>
								</div>
								<button
									className="m-0 p-0 text-left text-gray-500"
									type="button"
								>
									Forget Password?
								</button>
								<button type="submit" className="btn">
									Log in
								</button>
								<div className="or__container">
									<div className="or__line"></div>
									<div className="or__text">or</div>
									<div className="or__line"></div>
								</div>
								{/* <button
									className="form__google"
									onClick={(e) => {
										handleGoogleSubmit(e);
									}}
								>
									<FcGoogle size={28} />
									<span className="ml-[14px]">Sign in with Google</span>
								</button> */}
								<div
									id="g_id_onload"
									data-client_id="384831560241-qcib9uur9bmq5g2rfdt41tft9ll8ucmh.apps.googleusercontent.com"
									data-context="signin"
									data-ux_mode="popup"
									data-callback="handleGoogleSubmit"
									data-auto_prompt="false"
								></div>

								<div
									className="g_id_signin"
									data-type="icon"
									data-shape="pill"
									data-theme="outline"
									data-text="continue_with"
									data-size="large"
									data-locale="en"
									data-logo_alignment="center"
									data-width="480"
								></div>
							</form>
						</div>
					</div>
					{isDesktopView && (
						<div className="login__image">
							<Image src={bg} alt="background" priority />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Login;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { req, res } = context;
	const { token } = req.cookies;
	if (token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
