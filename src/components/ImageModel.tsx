import React from "react";
import { Modal } from "./model/Model";
import Image from "next/image";

interface ImageModelProps {
	shouldShowModal: boolean;
	handleClose: () => void;
	image: string;
}

const ImageModel = ({
	shouldShowModal,
	handleClose,
	image,
}: ImageModelProps) => {
	return (
		<Modal
			size="xlg"
			shouldShowModal={shouldShowModal}
			handleClose={handleClose}
			wrapperClass="overflow-hidden"
		>
			<img
				src={image}
				alt="attachment"
				className="w-[100%] h-[150px] object-contain overflow-hidden"
			/>
		</Modal>
	);
};

export default ImageModel;
