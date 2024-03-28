import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

import { createPortal } from "react-dom";
import useNoScroll from "../../hooks/useNoScroll";
import { AnimatePresence, Variants, motion } from "framer-motion";

export interface ModalProps {
	size: string;
	header?: string | JSX.Element;
	wrapperClass?: string;
	backdropClass?: string;
	children: JSX.Element;
	shouldShowModal: boolean;
	footer?: string | JSX.Element;
	handleClose: () => void;
	isLoading?: boolean;
	showLoadingOverlay?: boolean;
	isOverFlowModal?: boolean;
	shouldPersistBackdrop?: boolean;
	usePortal?: boolean;
}

export const Modal = (props: ModalProps) => {
	// Props goes here
	const {
		size = "lg",
		header,
		children,
		shouldShowModal,
		wrapperClass = "",
		backdropClass = "",
		footer,
		handleClose,
		isLoading = false,
		showLoadingOverlay = false,
		isOverFlowModal = false,
		shouldPersistBackdrop = false,
		usePortal = false,
	} = props;

	// Refs goes here
	const modalBodyRef = useRef<HTMLDivElement | null>(null);
	const modalHeaderRef = useRef<HTMLDivElement | null>(null);
	const modalFooterRef = useRef<HTMLDivElement | null>(null);

	// States goes here
	const [refScrollHeight, setRefScrollHeight] = useState(0);

	// Hooks goes here
	useNoScroll(shouldShowModal);

	const handleBackdropClick = () => {
		if (shouldPersistBackdrop) return;

		handleClose();
	};

	useEffect(() => {
		const clientHeight = modalBodyRef.current?.clientHeight ?? 0;
		const scrollHeight = refScrollHeight ?? modalBodyRef.current?.scrollHeight;

		if (clientHeight < scrollHeight) {
			modalFooterRef.current?.classList.add("modal__footer--shadow");
		}
	}, [modalFooterRef, modalBodyRef, refScrollHeight]);

	useEffect(() => {
		if (!modalBodyRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			setRefScrollHeight(modalBodyRef.current?.scrollHeight ?? 0);
		});
		resizeObserver.observe(modalBodyRef.current);

		return () => {
			resizeObserver.disconnect();
			modalFooterRef.current?.classList.remove("modal__footer--shadow");
		};
	}, []);

	const handleScroll = () => {
		if (modalBodyRef.current?.scrollTop !== 0) {
			modalHeaderRef.current?.classList.add("modal__header--shadow");
		} else {
			modalHeaderRef.current?.classList.remove("modal__header--shadow");
		}
	};

	useEffect(() => {
		if (shouldShowModal && modalBodyRef.current) {
			modalBodyRef.current.focus();
		}
	}, [shouldShowModal]);

	const modalBackdropClass = classNames("modal__backdrop", backdropClass);
	const modalWrapperClass = classNames(`modal modal--${size} ${wrapperClass}`, {
		"modal--no-header": !header,
	});
	const modalBodyClasses = classNames("modal__body");
	const modalFooterClasses = classNames("modal__footer", {
		"modal__footer--shadow": isOverFlowModal,
	});

	const LoadingElement = <div className="loader" />;

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
			onClick={handleBackdropClick}
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
			{footer && (
				<div className={modalFooterClasses} ref={modalFooterRef}>
					{footer}
				</div>
			)}
			{/* <LoadingOverlay isLoading={showLoadingOverlay} /> */}
		</motion.div>
	);

	if (usePortal && typeof document !== "undefined") {
		return (
			<>
				{createPortal(
					<AnimatePresence>
						{shouldShowModal && (
							<>
								{BackdropElement}
								{isLoading ? LoadingElement : BodyElement}
							</>
						)}
					</AnimatePresence>,
					document.getElementById("portal") ??
						document.getElementById("body") ??
						document.body
				)}
			</>
		);
	}

	return (
		<>
			<AnimatePresence>
				{shouldShowModal && (
					<>
						{BackdropElement}
						{isLoading ? LoadingElement : BodyElement}
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
