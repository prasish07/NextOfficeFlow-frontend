import React from "react";
import { Modal } from "../model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "@/query/employee";
import { toast } from "react-toastify";
import DropzoneProfilePic from "../DropzoneProfilePic";

interface Props {
	shouldShowModal: boolean;
	handleClose: () => void;
	id: string;
}

const PhotoChange = ({ shouldShowModal, handleClose, id }: Props) => {
	const queryClient = useQueryClient();
	const UpdateImageMutation = useMutation({
		mutationFn: updateEmployee,
		onSuccess: (data: any) => {
			toast.success("Profile picture updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["user", 1],
			});
			handleClose();
		},
		onError: (error: any) => {
			toast.error("Error updating profile picture");
		},
	});
	const handleProfilePicSubmit = (image: string) => {
		UpdateImageMutation.mutate({
			data: {
				profilePicture: image,
			},
			employeeId: id,
		});
	};
	return (
		<Modal
			size="lg"
			shouldShowModal={shouldShowModal}
			handleClose={handleClose}
			header={<h2>Change your profile picture</h2>}
		>
			<DropzoneProfilePic
				className="p-16 mt-10 border border-neutral-200"
				handleProfilePicSubmit={handleProfilePicSubmit}
			/>
		</Modal>
	);
};

export default PhotoChange;
