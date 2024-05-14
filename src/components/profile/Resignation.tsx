import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sentResignation } from "@/query/employee";

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

const Resignation = () => {
	const [hrEmail, setHREmail] = useState("");
	const [resignationBody, setResignationBody] = useState("");

	const handleHREmailChange = (e: any) => {
		setHREmail(e.target.value);
	};

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
			["image", "link", "blockquote"],
			["clean"],
		],
	};

	const resignationMutation = useMutation({
		mutationFn: sentResignation,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setHREmail("");
			setResignationBody("");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleResignationBodyChange = (value: string) => {
		setResignationBody(value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		resignationMutation.mutate({ email: hrEmail, content: resignationBody });
	};

	return (
		<form className="p-4 border rounded-lg shadow-md" onSubmit={handleSubmit}>
			<h2 className="text-xl font-bold mb-4">Resignation</h2>
			<div className="mb-4">
				<label htmlFor="hrEmail" className="block font-semibold mb-1">
					HR Email
				</label>
				<input
					type="email"
					id="hrEmail"
					className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
					value={hrEmail}
					onChange={handleHREmailChange}
					placeholder="Enter HR email address"
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="resignationBody" className="block font-semibold mb-1">
					Content
				</label>
				<ReactQuill
					theme="snow"
					value={resignationBody}
					onChange={handleResignationBodyChange}
					className="announcement__element-content"
					modules={{
						...modules,
					}}
				/>
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
				type="submit"
			>
				Sent Resignation Email
			</button>
		</form>
	);
};

export default Resignation;
