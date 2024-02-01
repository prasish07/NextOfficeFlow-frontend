import { uploadFiles } from "@/query/employee";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
	useDropzone,
	DropzoneRootProps,
	DropzoneInputProps,
} from "react-dropzone";
import { IoClose } from "react-icons/io5";

const Dropzone: React.FC<{
	className: string;
	setImages: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ className, setImages }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);

	const uploadMutation = useMutation({
		mutationFn: uploadFiles,
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles((previousFiles) => [
			...previousFiles,
			...acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			),
		]);
	}, []);

	const removeFile = (fileName: string) => {
		setFiles((previousFiles) =>
			previousFiles.filter((file) => file.name !== fileName)
		);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
		maxSize: 1024 * 1024 * 2,
	});

	const handleSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		if (!files?.length) return;
		setUploading(true);
		const uploadFile = async (fileIndex: number) => {
			const file = files[fileIndex];
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "nextofficeflow");

			try {
				const response = await uploadMutation.mutateAsync(formData);
				console.log(response);
				setImages((previousImages) => [...previousImages, response.secure_url]);

				setFiles((previousFiles) =>
					previousFiles.filter((f) => f.name !== file.name)
				);

				if (fileIndex + 1 < files.length) {
					await uploadFile(fileIndex + 1);
				}
			} catch (error) {
				console.log(error);
			}
		};

		await uploadFile(0);
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
					<p>Drop the files here ...</p>
				) : (
					<p>Drag and drop some files here, or click to select files</p>
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

			<ul className="dropdown-preview">
				{files.map((file: any) => (
					<li key={file.name} className="relative h-32 rounded-md shadow-lg">
						<Image
							src={file.preview}
							alt={file.name}
							width={100}
							height={100}
							onLoad={() => {
								URL.revokeObjectURL(file.preview);
							}}
							className="h-full w-full object-contain rounded-md"
						/>
						<button
							type="button"
							className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
							onClick={() => removeFile(file.name)}
						>
							<IoClose className="w-5 h-5  hover:fill-secondary-400 transition-colors" />
						</button>
						<p className="mt-2 text-neutral-500 text-[12px] font-medium">
							{file.name}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropzone;
