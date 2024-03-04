import { useGlobalProvider } from "@/context/GlobalProvicer";
import React from "react";
import { IoMenu } from "react-icons/io5";

const MenuBtn = () => {
	const { setIsNavbarOpen, navbarRef } = useGlobalProvider();
	return (
		<button
			className="menu"
			onClick={() => {
				setIsNavbarOpen(true);
				navbarRef.current?.classList.add("nav--open");
			}}
		>
			<IoMenu size={30} />
		</button>
	);
};

export default MenuBtn;
