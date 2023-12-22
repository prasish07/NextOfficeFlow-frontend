import React, { useRef, useState } from "react";
import { navList } from "@/constants/navList";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

interface NavData {
	title: string;
	subList?: { title: string }[];
}

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState<number | null>(null);

	const handleElementClick = (index: number) => {
		setIsOpen((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<>
			<nav className="nav">
				<h3 className="nav__title">Features</h3>
				<div className="nav__list">
					{navList.map((data, index) => (
						<>
							<div
								className={`nav__element ${index !== 0 && "mt-[20px]"} ${
									index === isOpen ? "nav__element--open" : ""
								} `}
								key={index}
								onClick={() => handleElementClick(index)}
							>
								<div className="flex gap-3 items-center">
									<MdDashboard size={24} />
									<span>{data.title}</span>
									{data.subList.length ? <IoIosArrowDown size={20} /> : ""}
								</div>
							</div>
							{data.subList &&
								data.subList.map((subData, subIndex) => (
									<div
										className={`nav__sub-list ${
											index === isOpen ? "nav__sub-list--open" : ""
										} `}
										key={subIndex}
									>
										<div className="nav__sub-list-1">
											<div className="nav__sub-list-2">
												<div className="nav__sub-element">
													<MdDashboard size={24} />
													<span>{subData.title}</span>
												</div>
											</div>
										</div>
									</div>
								))}
						</>
					))}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
