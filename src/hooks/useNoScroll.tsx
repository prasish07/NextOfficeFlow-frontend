import { useEffect } from "react";

const useNoScroll = (shouldAddClass = false) => {
	// Effect goes here
	useEffect(() => {
		if (!shouldAddClass) return;

		const bodyElem = document.querySelector("body");

		if (!bodyElem) return;

		bodyElem.classList.add("no-scroll");

		return () => {
			bodyElem.classList.remove("no-scroll");
		};
	}, [shouldAddClass]);
};

export default useNoScroll;
