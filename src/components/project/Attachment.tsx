import React, { useState } from "react";
import Dropzone from "../Dropzone";
import prasish from "@/assets/images/prasish.jpg";
import Image from "next/image";
import { addAttachmentProject, useGetProjectAttachment } from "@/query/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Attachment = ({ endpoint }: { endpoint: string }) => {
	const [images, setImages] = useState<string[]>([]);

	const { data, isLoading, isError } = useGetProjectAttachment({ endpoint });
	const queryClient = useQueryClient();

	const uploadMutation = useMutation({
		mutationFn: addAttachmentProject,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["project attachment", endpoint],
			});
		},
		onError: (error: any) => {},
	});

	const handleUpload = async (e: any) => {
		e.preventDefault();

		// Define a function for asynchronous uploading
		const uploadAsync = async (image: any) => {
			await uploadMutation.mutate({
				attachment: image,
				endpoint,
			});
		};

		await Promise.all(images.map(uploadAsync));

		setImages([]);
		toast.success("Files uploaded to project");
	};

	if (isLoading) {
		return <div className="loader" />;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const { attachments } = data;

	return (
		<div className="project-id__attachment">
			<div className="project-id__attachment--header">
				<h3>Attachments</h3>
			</div>
			<div className="project-id__attachment--other-attachments">
				<div className="project-id__attachment--other-attachments-item">
					{attachments.map((attachment: any) => {
						return (
							<div
								className="project-id__attachment--other-attachments-item--images"
								key={attachment._id}
								title={`Add by ${attachment.UserId.email}`}
							>
								<a href={attachment.attachment} key={attachment._id}>
									<img src={attachment.attachment} alt="attachment" />
								</a>
								<h3>{attachment.UserId.email.split("@")[0]}</h3>
							</div>
						);
					})}
				</div>
			</div>
			<form className="project-id__attachment--upload">
				<h2>Upload your images</h2>
				<Dropzone
					className="p-16 mt-10 border border-neutral-200"
					setImages={setImages}
				/>
				<div className="project-id__attachment--upload-btn">
					<div className="flex flex-wrap gap-2">
						{images.map((image: any, index) => {
							return <img src={image} alt="attachment" key={index} />;
						})}
					</div>
					<button onClick={handleUpload} type="button" className="mt-5">
						Upload to this Project
					</button>
				</div>
			</form>
		</div>
	);
};

export default Attachment;
