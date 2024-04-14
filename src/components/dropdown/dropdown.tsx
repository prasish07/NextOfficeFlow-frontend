import React, {
	useState,
	useRef,
	useEffect,
	cloneElement,
	ReactElement,
} from "react";
import ReactDOM from "react-dom";

export type Placement = "topRight" | "bottomRight";

export type DropdownItem = {
	callBack: () => void;
	labelElement: JSX.Element;
};

export interface PopoverProps {
	content: DropdownItem[];
	placement?: Placement;
	trigger?: "click";
	className?: string;
	children: JSX.Element;
	handleOnClose?: () => void;
}

export const DropdownPopover: React.FC<PopoverProps> = ({
	content,
	placement = "top",
	trigger = "click",
	className = "",
	children,
}) => {
	const [visible, setVisible] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState<{
		top: number;
		left: number;
	}>({
		top: 0,
		left: 0,
	});
	const [search, setSearch] = useState<string>("");

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
			}
		};

		handlePopoverPosition();

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentRef, targetRef, visible, placement]);

	const handleToggle = () => {
		if (trigger === "click") {
			setVisible(!visible);
		}
	};

	const handlePopoverPosition = () => {
		if (contentRef.current && targetRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect();
			const popoverRect = contentRef.current.getBoundingClientRect() as DOMRect;
			setPopoverPosition(
				getPopoverPosition(targetRect, popoverRect, placement)
			);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const isPositionSet = popoverPosition.top !== 0 || popoverPosition.left !== 0;

	content = content.filter((item) => {
		if (search === "") {
			return true;
		}
		return item.labelElement.props.children
			.toString()
			.toLowerCase()
			.includes(search.toLowerCase());
	});

	return (
		<>
			{cloneElement(children as ReactElement, {
				ref: targetRef,
				onClick: handleToggle,

				className: `${children.props.className} ${visible ? "active" : ""}`,
			})}
			{visible &&
				ReactDOM.createPortal(
					<div
						className={`popover-content popover-${placement} dropdown ${
							isPositionSet ? "ready" : ""
						} ${className}`}
						ref={contentRef}
						style={{
							top: popoverPosition.top,
							left: popoverPosition.left,
						}}
					>
						<input
							type="text"
							placeholder="Search..."
							value={search}
							onChange={handleSearch}
						/>
						{content.map((item) => {
							return cloneElement(item.labelElement as ReactElement, {
								onClick: () => {
									item.callBack();
									setVisible(false);
								},
							});
						})}
					</div>,
					document.getElementById("root") ?? document.body
				)}
		</>
	);
};

const getPopoverPosition = (
	triggerRect: DOMRect,
	popoverRect: DOMRect,
	viewPortSensitivePlacement: string
) => {
	const popoverWidth = popoverRect.width;
	const popoverHeight = popoverRect.height;
	const gap = 8; // gap between popover and trigger

	const leftToUse = triggerRect.left;
	const topToUse = triggerRect.top;

	let left: number;
	let top: number;

	switch (viewPortSensitivePlacement) {
		case "topRight":
			left = leftToUse - popoverWidth + triggerRect.width;
			top = topToUse - popoverHeight - gap;
			break;

		case "bottomRight":
			left = leftToUse - popoverWidth + triggerRect.width;
			top = topToUse + triggerRect.height + gap;
			break;
		default:
			left = 0;
			top = 0;
	}

	return { left, top };
};
