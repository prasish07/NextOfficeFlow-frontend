import useCheckScreenWidth from "@/hooks/useCheckScreenWidth";
import { LoginData, LoginResponse, loginUser } from "@/query/api";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import bg from "@/assets/background/office.svg";
import Image from "next/image";
import Link from "next/link";
import { googleUrl } from "@/constants/apis";
import { useRouter } from "next/router";
import {
	GoogleLogin,
	GoogleOAuthProvider,
	useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";

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

	const mutateData = useMutation({
		mutationFn: loginUser,
		onSuccess: (data: LoginResponse) => {
			console.log("success", data);
			router.push("/");
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutateData.mutate(userData);
	};

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
								<button className="m-0 p-0 text-left text-gray-500">
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
								<Link className="form__google" href={googleUrl}>
									<FcGoogle size={28} />
									<span className="ml-[14px]">Sign in with Google</span>
								</Link>
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
