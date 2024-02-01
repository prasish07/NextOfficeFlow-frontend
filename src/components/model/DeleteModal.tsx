import React, { useEffect } from "react";
import { Modal } from "./Model";

interface DeleteProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	action: () => void;
}

const DeleteModal = ({
	showModal,
	setShowModal,
	action,
	title,
}: DeleteProps) => {
	return (
		<Modal
			size="sm"
			shouldShowModal={showModal}
			handleClose={() => setShowModal(false)}
			header={title}
		>
			<div className="flex justify-center gap-2">
				<button
					className="action-btn"
					onClick={() => {
						action();
						setShowModal(false);
					}}
				>
					Delete
				</button>
				<button className="action-btn" onClick={() => setShowModal(false)}>
					Cancel
				</button>
			</div>
		</Modal>
	);
};

export default DeleteModal;
