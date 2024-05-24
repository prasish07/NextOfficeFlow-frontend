import React, { ReactNode } from "react";

export interface DashboardInfoProps {
	icon: ReactNode;
	title: string;
	count: number;
}

const DashboardInfo = (props: DashboardInfoProps) => {
	const { icon, title, count } = props;
	return (
		<div className="info">
			<i className="info__logo">{icon}</i>
			<div className="info__text">
				<h2 className="info__title">{title}</h2>
				<p className="info__count">{count}</p>
			</div>
		</div>
	);
};

export default DashboardInfo;
