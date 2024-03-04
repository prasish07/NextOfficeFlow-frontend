import { useEffect, useState } from "react";
import {
	MIN_TABLET_VIEW_WIDTH,
	MIN_DESKTOP_VIEW_WIDTH,
} from "../constants/consts";

const useScreenWidth = () => {
	// State goes here
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const handleWindowSizeChange = () => {
			setWidth(window?.innerWidth);
		};

		handleWindowSizeChange();

		window.addEventListener("resize", handleWindowSizeChange);

		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	let isMobileView = false;
	let isTabletView = false;
	let isDesktopView = false;
	let isActualTabletView = false;

	if (width) {
		isMobileView = width < MIN_TABLET_VIEW_WIDTH;
		isTabletView = width < MIN_DESKTOP_VIEW_WIDTH;
		isDesktopView = width > MIN_TABLET_VIEW_WIDTH;
		isActualTabletView = !isMobileView && isTabletView;
	}

	return {
		width,
		isMobileView,
		isTabletView,
		isDesktopView,
		isActualTabletView,
	};
};

export default useScreenWidth;
