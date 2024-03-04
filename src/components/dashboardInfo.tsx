import React from "react";

export interface DashboardInfoProps {
	icon: string;
	title: string;
	count: number;
}

const DashboardInfo = (props: DashboardInfoProps) => {
	return (
		<div className="info">
			<i className="info__logo">hi</i>
			<div className="info__text">
				<h2 className="info__title">Active Employee</h2>
				<p className="info__count">50</p>
			</div>
		</div>
	);
};

export default DashboardInfo;
