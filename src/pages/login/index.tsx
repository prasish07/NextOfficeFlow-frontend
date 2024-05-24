import useCheckScreenWidth from "@/hooks/useCheckScreenWidth";
import {
	LoginResponse,
	forgetPassword,
	googleLoginUser,
	loginUser,
} from "@/query/api";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import bg from "@/assets/background/office.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookies } from "@/utils/cookies";
import { GetServerSidePropsContext } from "next";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

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
			if (data.verified && data.isFirstTimePasswordChange) {
				router.push("/");
				toast.success(data.message);
				setCookies("role", data.role, 1);
				setCookies("UserId", data.userId, 1);
				setCookies("token", data.token, 7);
			} else if (data.verified && !data.isFirstTimePasswordChange) {
				toast.success(data.message);
				router.push(`/login/change-password?id=${data.userId}`);
			} else {
				toast.error("Please verify your email first");
				router.push(`/login/verify-account?id=${data.userId}`);
			}
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const mutateForgetPassword = useMutation({
		mutationFn: forgetPassword,
		onSuccess: (data: any) => {
			router.push(`/login/reset-password?id=${data.userId}`);
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

	const handleGoogleSubmit = useGoogleLogin({
		onSuccess: (codeResponse: any) =>
			googleMutateData.mutate({ tokens: codeResponse.access_token }),
	});

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
									<div className="password-input w-full">
										<input
											type={showPassword ? "text" : "password"}
											name="password"
											id="password"
											placeholder="Enter Password"
											onChange={handleChange}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? "Hide" : "Show"}
										</button>
									</div>
								</div>
								<button
									className="m-0 p-0 text-left text-gray-500"
									type="button"
									onClick={() => {
										mutateForgetPassword.mutate(userData.email);
									}}
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
								<button
									className="form__google"
									onClick={(e) => {
										handleGoogleSubmit();
									}}
									type="button"
								>
									<FcGoogle size={28} />
									<span className="ml-[14px]">Sign in with Google</span>
								</button>
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

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {
// 	const { req, res } = context;
// 	const { token } = req.cookies;
// 	if (token) {
// 		return {
// 			redirect: {
// 				destination: "/",
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return {
// 		props: {},
// 	};
// };
