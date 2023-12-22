import Image from "next/image";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";

const Header = () => {
	return (
		<section className="header">
			<div className="container">
				<div className="header__contain">
					<h1 className="header__title">
						Next<span className="text-[#3498db] font-bold">Office</span>Flow
					</h1>
					<div className="header__nav">
						<ul className="header__nav-list">
							<li className="header__nav-item">
								<button>
									<IoNotifications color="grey" size={30} />
								</button>
							</li>
							<li className="header__nav-item header__nav-item--profile">
								<i className="header__profile-logo">
									<span>P</span>
								</i>
								<span>Prasish</span>
								<i>
									<IoIosArrowDown size={18} />
								</i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Header;
