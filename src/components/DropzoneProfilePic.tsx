import { uploadFiles } from "@/query/employee";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import {
	useDropzone,
	DropzoneRootProps,
	DropzoneInputProps,
} from "react-dropzone";
import { IoClose } from "react-icons/io5";

const DropzoneProfilePic: React.FC<{
	className: string;
	handleProfilePicSubmit: (image: string) => void;
}> = ({ className, handleProfilePicSubmit }) => {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	const uploadMutation = useMutation({
		mutationFn: uploadFiles,
	});

	const onDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	};

	const removeFile = () => {
		setFile(null);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
		maxSize: 1024 * 1024 * 2, // 2 MB
		multiple: false,
	});

	const handleSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		if (!file) return;
		setUploading(true);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "nextofficeflow");

		try {
			const response = await uploadMutation.mutateAsync(formData);
			// setImage(response.secure_url);
			handleProfilePicSubmit(response.secure_url);
			setFile(null);
		} catch (error) {
			console.log(error);
		}

		setUploading(false);
	};

	return (
		<div>
			<div
				{...getRootProps({
					className: `dropzone ${className}`,
				} as DropzoneRootProps)}
			>
				<input {...(getInputProps() as DropzoneInputProps)} />
				{isDragActive ? (
					<p>Drop the file here ...</p>
				) : (
					<p>Drag and drop a picture here, or click to picture a file</p>
				)}
			</div>
			<button
				className="dropdown-upload disabled:bg-slate-500"
				type="button"
				onClick={(e) => handleSubmit(e)}
				disabled={uploading}
			>
				{uploading ? "Uploading..." : "Upload"}
			</button>

			{file && (
				<div className="dropdown-preview">
					<div className="relative h-32 rounded-md shadow-lg">
						<Image
							src={URL.createObjectURL(file)}
							alt={file.name}
							width={100}
							height={100}
							onLoad={() => {
								URL.revokeObjectURL(URL.createObjectURL(file));
							}}
							className="h-full w-full object-contain rounded-md"
						/>
						<button
							type="button"
							className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
							onClick={removeFile}
						>
							<IoClose className="w-5 h-5 hover:fill-secondary-400 transition-colors" />
						</button>
						<p className="mt-2 text-neutral-500 text-[12px] font-medium">
							{file.name}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropzoneProfilePic;
