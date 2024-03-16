import { useGetNotification } from "@/query/notification";
import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

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
				<button>Mark as read</button>
			</div>
			<hr className="my-2" />

			<div className="notification-dropdown__list">
				{notifications.map((notification: any, index: number) => (
					<div key={index} className="notification-dropdown__item">
						<div className="notification-dropdown__item--title">
							<IoInformationCircle size={34} className="text-blue-300" />
							<div dangerouslySetInnerHTML={{ __html: notification.message }} />
						</div>
						<GoDotFill className="text-blue-500" size={24} />
					</div>
				))}
				<button>Show all</button>
			</div>
		</div>
	);
};

export default Dropdown;
