import {
	updateAllNotificationStatus,
	updateNotificationStatus,
	useGetNotification,
} from "@/query/notification";
import React, { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Dropdown = ({
	dropdownRef,
}: {
	dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
	const { data, isLoading, isError } = useGetNotification();
	const router = useRouter();
	const seenMutation = useMutation({
		mutationFn: updateNotificationStatus,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["notification"],
			});
		},
	});

	const seenAllMutation = useMutation({
		mutationFn: updateAllNotificationStatus,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["notification"],
			});
		},
	});

	const queryClient = useQueryClient();
	if (isLoading) return <></>;

	if (isError || !data) return <>No notification</>;

	const { notifications } = data;

	const handleNotificationClick = (id: string, link: string) => {
		seenMutation.mutate(id);
		router.push(link);
		if (dropdownRef.current)
			dropdownRef.current.classList.remove("notification-dropdown--open");
	};

	return (
		<div className="notification-dropdown" ref={dropdownRef}>
			<div className="notification-dropdown__title">
				<h2>Notifications</h2>
				<button
					onClick={() => {
						seenAllMutation.mutate();
					}}
				>
					Mark as read
				</button>
			</div>
			<hr className="mt-2" />

			<div className="notification-dropdown__list">
				{notifications.map((notification: any, index: number) => (
					<>
						<div
							key={index}
							className="notification-dropdown__item"
							onClick={() =>
								handleNotificationClick(notification._id, notification.link)
							}
						>
							<div className="notification-dropdown__item--title">
								<IoInformationCircle size={34} className="text-blue-300" />
								<p dangerouslySetInnerHTML={{ __html: notification.message }} />
							</div>
							{!notification.isSeen && (
								<GoDotFill className="text-blue-500" size={24} />
							)}
						</div>
						<hr />
					</>
				))}
				{/* <button>Show all</button> */}
			</div>
		</div>
	);
};

export default Dropdown;
