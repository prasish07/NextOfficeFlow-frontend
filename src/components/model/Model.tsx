import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

import { AnimatePresence, Variants, motion } from "framer-motion";

export interface ModalProps {
	size: string;
	header?: string | JSX.Element;
	children: JSX.Element;
	shouldShowModal: boolean;
	handleClose: () => void;
}

export const Modal = (props: ModalProps) => {
	const { size = "lg", header, children, shouldShowModal, handleClose } = props;

	const modalBodyRef = useRef<HTMLDivElement | null>(null);
	const modalHeaderRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		if (modalBodyRef.current?.scrollTop !== 0) {
			modalHeaderRef.current?.classList.add("modal__header--shadow");
		} else {
			modalHeaderRef.current?.classList.remove("modal__header--shadow");
		}
	};

	const modalBackdropClass = classNames("modal__backdrop");
	const modalWrapperClass = classNames(`modal modal--${size}`);
	const modalBodyClasses = classNames("modal__body");

	const modalVariants: Variants = {
		hidden: {
			opacity: 0,
			transform: "translate(-50%, -50%) scale(0.8)",
			transition: { duration: 0.1 },
		},
		visible: {
			opacity: 1,
			transform: "translate(-50%, -50%) scale(1)",
			transition: { duration: 0.2 },
		},
	};

	const backdropVariants: Variants = {
		hidden: { opacity: 0, transition: { duration: 0.2 } },
		visible: { opacity: 1, transition: { duration: 0.2 } },
	};

	const BackdropElement = (
		<motion.div
			variants={backdropVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={modalBackdropClass}
			onClick={handleClose}
		/>
	);
	const BodyElement = (
		<motion.div
			variants={modalVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={modalWrapperClass}
		>
			{header && (
				<div className="modal__header" ref={modalHeaderRef}>
					{typeof header === "string" ? (
						<h2 className="modal__header__title">{header}</h2>
					) : (
						header
					)}
					<CrossIcon handleClose={handleClose} />
				</div>
			)}
			<div
				onScroll={handleScroll}
				className={modalBodyClasses}
				ref={modalBodyRef}
			>
				{children}
			</div>
		</motion.div>
	);

	return (
		<>
			<AnimatePresence>
				{shouldShowModal && (
					<>
						{BackdropElement}
						{BodyElement}
					</>
				)}
			</AnimatePresence>
		</>
	);
};

const CrossIcon = ({ handleClose }: { handleClose: () => void }) => (
	<button type="button" className="modal__cross-icon">
		<FiX size={32} className="modal__header__close" onClick={handleClose} />
	</button>
);
