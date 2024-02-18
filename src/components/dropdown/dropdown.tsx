import React, {
	useState,
	useRef,
	useEffect,
	cloneElement,
	ReactElement,
} from "react";
import ReactDOM from "react-dom";

export type Placement =
	| "top"
	| "topLeft"
	| "topRight"
	| "right"
	| "rightTop"
	| "rightBottom"
	| "bottom"
	| "bottomLeft"
	| "bottomRight"
	| "left"
	| "leftTop"
	| "leftBottom";

export type DropdownItem = {
	callBack: () => void;
	labelElement: JSX.Element;
};

export interface PopoverProps {
	content: DropdownItem[];
	placement?: Placement;
	trigger?: "click" | "hover" | "focus";
	arrow?: boolean;
	className?: string;
	chopLeft?: number;
	chopTop?: number;
	children: JSX.Element;
	handleOnClose?: () => void;
}

export const DropdownPopover: React.FC<PopoverProps> = ({
	content,
	placement = "top",
	trigger = "click",
	arrow = true,
	className = "",
	chopLeft = 0,
	chopTop = 0,
	children,
	handleOnClose = () => {},
}) => {
	const [visible, setVisible] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState<{
		top: number;
		left: number;
	}>({
		top: 0,
		left: 0,
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const isInsideTarget =
				targetRef.current && targetRef.current.contains(event.target as Node);
			const isInsideContent =
				contentRef.current && contentRef.current.contains(event.target as Node);

			if (!isInsideTarget && !isInsideContent) {
				setVisible(false);
				handleOnClose();
			}
		};

		const handleResize = () => {
			if (visible) {
				handlePopoverPosition();
			}
		};

		const resizeObserver = new ResizeObserver(() => {
			// Do what you want to do when the size of the element changes
			if (visible) {
				handlePopoverPosition();
			}
		});

		contentRef.current && resizeObserver.observe(contentRef.current);

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleResize);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleResize);
		};
	}, [contentRef, targetRef, visible, placement]);

	const handleToggle = () => {
		if (trigger === "click") {
			setVisible(!visible);
		}
	};

	const handleMouseEnter = () => {
		if (trigger === "hover") {
			setVisible(true);
		}
	};

	const handleMouseLeave = () => {
		if (trigger === "hover") {
			setVisible(false);
		}
	};

	const handleFocus = () => {
		if (trigger === "focus") {
			setVisible(true);
		}
	};

	const handleBlur = () => {
		if (trigger === "focus") {
			setVisible(false);
		}
	};

	const handleTouchStart = (e: Event) => {
		if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
			setVisible(false);
		}
	};

	const handlePopoverPosition = () => {
		if (contentRef.current && targetRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect();
			const popoverRect = contentRef.current.getBoundingClientRect() as DOMRect;
			setPopoverPosition(
				getPopoverPosition(
					targetRect,
					popoverRect,
					placement,
					chopLeft,
					chopTop
				)
			);
		}
	};

	useEffect(() => {
		if (visible) {
			handlePopoverPosition();
		}

		document.addEventListener("touchmove", handleTouchStart, true);
		return () => {
			document.removeEventListener("touchmove", handleTouchStart, true);
		};
	}, [visible, placement]);

	const isPositionSet = popoverPosition.top !== 0 || popoverPosition.left !== 0;

	return (
		<>
			{cloneElement(children as ReactElement, {
				ref: targetRef,
				onClick: handleToggle,
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				onFocus: handleFocus,
				onBlur: handleBlur,
				className: `${children.props.className} ${visible ? "active" : ""}`,
			})}
			{visible &&
				ReactDOM.createPortal(
					<div
						className={`pro-popover-content popover-${placement} ${
							arrow ? "has-arrow" : ""
						} pro-dropdown ${isPositionSet ? "ready" : ""} ${className}`}
						ref={contentRef}
						style={{
							top: popoverPosition.top,
							left: popoverPosition.left,
						}}
					>
						{content.map((item) => {
							return cloneElement(item.labelElement as ReactElement, {
								onClick: () => {
									item.callBack();
									setVisible(false);
								},
								onMouseEnter: handleMouseEnter,
								onMouseLeave: handleMouseLeave,
								onFocus: handleFocus,
								onBlur: handleBlur,
							});
						})}
					</div>,
					document.getElementById("portal") ??
						document.getElementById("root") ??
						document.body
				)}
		</>
	);
};

const getPopoverPosition = (
	triggerRect: DOMRect,
	popoverRect: DOMRect,
	viewPortSensitivePlacement: Placement,
	chopLeft: number,
	chopTop: number
) => {
	const popoverWidth = popoverRect.width;
	const popoverHeight = popoverRect.height;
	const gap = 8; // gap between popover and trigger

	const leftToUse = triggerRect.left - chopLeft;
	const topToUse = triggerRect.top - chopTop;

	let left: number;
	let top: number;

	switch (viewPortSensitivePlacement) {
		case "top":
			left = leftToUse - popoverWidth / 2 + triggerRect.width / 2;
			top = topToUse - popoverHeight - gap;
			break;
		case "topLeft":
			left = leftToUse;
			top = topToUse - popoverHeight - gap;
			break;
		case "topRight":
			left = leftToUse - popoverWidth + triggerRect.width;
			top = topToUse - popoverHeight - gap;
			break;
		case "right":
			left = leftToUse + triggerRect.width + gap;
			top = topToUse - popoverHeight / 2 + triggerRect.height / 2;
			break;
		case "rightTop":
			left = leftToUse + triggerRect.width + gap;
			top = topToUse;
			break;
		case "rightBottom":
			left = leftToUse + triggerRect.width + gap;
			top = topToUse - popoverHeight + triggerRect.height;
			break;
		case "bottom":
			left = leftToUse - popoverWidth / 2 + triggerRect.width / 2;
			top = topToUse + triggerRect.height + gap;
			break;
		case "bottomLeft":
			left = leftToUse;
			top = topToUse + triggerRect.height + gap;
			break;
		case "bottomRight":
			left = leftToUse - popoverWidth + triggerRect.width;
			top = topToUse + triggerRect.height + gap;
			break;
		case "left":
			left = leftToUse - popoverWidth - gap;
			top = topToUse - popoverHeight / 2 + triggerRect.height / 2;
			break;
		case "leftTop":
			left = leftToUse - popoverWidth - gap;
			top = topToUse;
			break;
		case "leftBottom":
			left = leftToUse - popoverWidth - gap;
			top = topToUse - popoverHeight + triggerRect.height;
			break;
		default:
			left = 0;
			top = 0;
	}

	return { left, top };
};
