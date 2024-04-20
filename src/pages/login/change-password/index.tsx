import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { resetPassword } from "@/query/api";

const passwordSchema = z
	.object({
		password: z
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
			return date.password === date.confirmPassword;
		},
		{ message: "Passwords do not match", path: ["confirmPassword"] }
	);

type TPasswordSchema = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
	const router = useRouter();
	const [password, setPassword] = useState({
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
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

	const resetPasswordMutation = useMutation({
		mutationFn: resetPassword,
		onSuccess: (data: any) => {
			toast.success(data.message);
			router.push("/login");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const onSubmit = (data: TPasswordSchema) => {
		resetPasswordMutation.mutate({
			id: router.query.id as string,
			password: data.password,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex justify-center items-center w-full h-[100vh] "
		>
			<div className="employee__form-change-password">
				<div className="employee__form-item">
					<h2>Reset Password</h2>
					<div className="employee__form-item--group">
						<label htmlFor="password">Password</label>
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
						<label htmlFor="confirmPassword">Confirm Password</label>
						<div className="password-input">
							<input
								type={showConfirmPassword ? "text" : "password"}
								{...register("confirmPassword")}
								id="confirmPassword"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? "Hide" : "Show"}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
						)}
					</div>
					<button type="submit" className="btn">
						Reset Password
					</button>
				</div>
			</div>
		</form>
	);
};

export default ChangePassword;
