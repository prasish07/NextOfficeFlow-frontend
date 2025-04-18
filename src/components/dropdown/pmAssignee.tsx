import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllEmployees } from "@/query/employee";

const PMAssignee = ({
	children,
	setPM,
}: {
	children: JSX.Element;
	setPM: React.Dispatch<
		React.SetStateAction<{
			userId: string;
			email: string;
		}>
	>;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees({
		role: "project manager",
	});
	const queryClient = useQueryClient();

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;
	const { data: employeeData } = data;

	const dropdownContent = employeeData.map((employee: any) => ({
		labelElement: (
			<div key={employee._id} style={{ width: 100, padding: 16 }}>
				{employee.email}
			</div>
		),
		callBack: () => {
			setPM({
				userId: employee._id,
				email: employee.email,
			});
		},
	}));

	return (
		<DropdownPopover
			content={dropdownContent}
			trigger="click"
			placement="bottomRight"
		>
			{children}
		</DropdownPopover>
	);
};

export default PMAssignee;
