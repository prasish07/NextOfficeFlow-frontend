import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllEmployees } from "@/query/employee";

const CustomAssignee2 = ({
	children,
	setProjectId,
}: {
	children: JSX.Element;
	setProjectId: (projectId: string) => void;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();
	const queryClient = useQueryClient();

	if (isError || !data) return <div>Error</div>;
	const { data: employeeData } = data;

	const dropdownContent = employeeData.map((employee: any) => ({
		labelElement: (
			<div key={employee._id} style={{ width: 100, padding: 16 }}>
				{employee.email}
			</div>
		),
		callBack: () => {
			setProjectId(employee._id);
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

export default CustomAssignee2;
