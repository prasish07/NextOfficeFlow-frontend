import { useGetNotificationCount } from "@/query/notification";
import React from "react";

const Count = () => {
	const { data, isLoading } = useGetNotificationCount();

	if (isLoading) return <></>;

	return <p className="notification__count">{data?.count}</p>;
};

export default Count;
