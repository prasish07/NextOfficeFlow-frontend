import useNoScroll from "@/hooks/useNoScroll";
import useScreenWidth from "@/hooks/useScreenWidth";
import React, { useRef, useEffect } from "react";

interface ImageModalProps {
	imageUrl: string;
	onClose: () => void;
	shouldShowModal: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
	imageUrl,
	onClose,
	shouldShowModal,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useNoScroll(shouldShowModal);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (shouldShowModal) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [shouldShowModal, onClose]);

	return (
		<>
			{shouldShowModal && (
				<div className="fixed top-[0px] left-0 w-full h-[100vh] flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						ref={modalRef}
						className="w-[50%] h-[100%] overflow-auto pt-[60px]"
					>
						<div className="relative bg-white p-4 shadow-md">
							<button
								className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
								onClick={onClose}
							>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<img
								src={imageUrl}
								alt="Full Screen"
								className="object-contain"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ImageModal;
