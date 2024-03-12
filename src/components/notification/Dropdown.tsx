import { useGetNotification } from "@/query/notification";
import React from "react";

const Dropdown = ({
	dropdownRef,
}: {
	dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
	const { data, isLoading, isError } = useGetNotification();
	if (isLoading) return <></>;

	if (isError || !data) return <>No notification</>;

	const { notifications } = data;

	console.log(data);
	return (
		<div className="notification-dropdown" ref={dropdownRef}>
			<div className="notification-dropdown__title">
				<h2>Notifications</h2>
			</div>
			<hr className="my-2" />

			<div className="notification-dropdown__list">
				{notifications.map((notification: any, index: number) => (
					<div key={index} className="notification-dropdown__item">
						<p>{notification.message}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
