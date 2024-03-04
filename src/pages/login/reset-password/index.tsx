// VerifyAccount.js

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { verifyAccount, verifyPasswordPin } from "@/query/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const router = useRouter();
	const { id } = router.query as { id: string };
	const [pin, setPin] = useState("");

	const verifyMutation = useMutation({
		mutationFn: verifyPasswordPin,
		onSuccess: (data: any) => {
			toast.success(data.message);
			router.push("/");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleVerify = () => {
		verifyMutation.mutate({ id, pin });
	};

	return (
		<div className="verification-box__container">
			<div className="verification-box">
				<h2>Account Verification</h2>
				<p>Please enter the verification code sent to your email:</p>
				<input
					type="text"
					placeholder="Enter code"
					onChange={(e) => {
						setPin(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						handleVerify();
					}}
				>
					Verify
				</button>
			</div>
		</div>
	);
};

export default ResetPassword;
