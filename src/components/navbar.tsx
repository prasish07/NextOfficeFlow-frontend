import React, { useEffect, useRef, useState } from "react";
import { navList } from "@/constants/navList";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useGlobalProvider } from "@/context/GlobalProvicer";
import { IoMdClose } from "react-icons/io";

interface NavData {
	title: string;
	subList?: { title: string }[];
}

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState<number | null>(null);
	const { role } = useGlobalProvider();
	// const showNavElement =

	const handleElementClick = (index: number) => {
		setIsOpen((prevIndex) => (prevIndex === index ? null : index));
	};

	const { isNavbarOpen, navbarRef, setIsNavbarOpen } = useGlobalProvider();

	const { isMobileView } = useScreenWidth();

	useEffect(() => {
		if (isNavbarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isNavbarOpen]);

	return (
		<>
			<nav className="nav" ref={navbarRef}>
				<div className="nav__header">
					<h3 className="nav__title">Features</h3>
					{isMobileView && (
						<button
							onClick={() => {
								setIsNavbarOpen(false);
								navbarRef.current?.classList.remove("nav--open");
							}}
						>
							<IoMdClose size={30} />
						</button>
					)}
				</div>
				<div className="nav__list">
					{navList.map((data, index) => (
						<React.Fragment key={index}>
							{data.role.includes("all") || data.role.includes(role) ? (
								<>
									{data.subList.length ? (
										<button
											className={`nav__element ${index !== 0 && "mt-[20px]"} ${
												index === isOpen ? "nav__element--open" : ""
											} `}
											onClick={() => handleElementClick(index)}
										>
											<div className="flex gap-7 items-center">
												<data.icon size={24} />
												<span>{data.title}</span>
												{data.subList.length ? (
													<IoIosArrowDown size={20} className="arrow" />
												) : (
													""
												)}
											</div>
										</button>
									) : (
										<Link
											href={data.subList.length ? "" : data.path}
											className={`nav__element ${index !== 0 && "mt-[20px]"} ${
												index === isOpen ? "nav__element--open" : ""
											} `}
											onClick={() => {
												handleElementClick(index);
												setIsNavbarOpen(false);
												navbarRef.current?.classList.remove("nav--open");
											}}
										>
											<div className="flex gap-7 items-center">
												<data.icon size={24} />
												<span>{data.title}</span>
												{data.subList.length ? (
													<IoIosArrowDown size={20} className="arrow" />
												) : (
													""
												)}
											</div>
										</Link>
									)}

									{data.subList &&
										data.subList.map((subData, subIndex) =>
											(subData.role && subData.role.includes("all")) ||
											subData.role.includes(role) ? (
												<Link
													href={subData.path}
													className={`nav__sub-list ${
														index === isOpen ? "nav__sub-list--open" : ""
													} `}
													key={`${index}-${subIndex}`}
													onClick={() => {
														navbarRef.current?.classList.remove("nav--open");
													}}
												>
													<div className="nav__sub-list-1">
														<div className="nav__sub-list-2">
															<div className="nav__sub-element">
																<subData.icon size={24} />
																<span>{subData.title}</span>
															</div>
														</div>
													</div>
												</Link>
											) : (
												""
											)
										)}
								</>
							) : (
								""
							)}
						</React.Fragment>
					))}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
