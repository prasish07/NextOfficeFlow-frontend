import React, { useState } from "react";
import Dropzone from "../Dropzone";
import prasish from "@/assets/images/prasish.jpg";
import Image from "next/image";
import {
	addAttachmentProject,
	useGetProjectAttachment,
	useGetProjectDetails,
} from "@/query/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ImageModal from "../ImageModal";

const Attachment = ({ endpoint }: { endpoint: string }) => {
	const [images, setImages] = useState<string[]>([]);
	const [showImageModal, setShowImageModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");

	const { data, isLoading, isError } = useGetProjectDetails({ endpoint });
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

		uploadMutation.mutate({
			attachments: images,
			endpoint,
		});

		setImages([]);
		toast.success("Files uploaded to project");
	};

	if (isLoading) {
		return <div className="loader" />;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const { attachments } = data?.project;

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
								title={`Add by ${attachment.userId.email}`}
							>
								{/* <a href={attachment.attachment} key={attachment._id}>
									<img src={attachment.attachment} alt="attachment" />
								</a> */}
								<img
									src={attachment.attachment}
									alt="attachment"
									key={attachment._id}
									onClick={() => {
										setSelectedImage(attachment.attachment);
										setShowImageModal(true);
										console.log("sdfg");
									}}
								/>

								<h3>{attachment.userId.email.split("@")[0]}</h3>
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
			<ImageModal
				shouldShowModal={showImageModal}
				onClose={() => setShowImageModal(false)}
				imageUrl={selectedImage}
			/>
		</div>
	);
};

export default Attachment;
