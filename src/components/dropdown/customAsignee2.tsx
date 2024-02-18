import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAssignee } from "@/query/ticket";
import { useGetProjectList } from "@/query/project";
import { useGetAllEmployees } from "@/query/employee";

const CustomeAssignee2 = ({
	children,
	setProjectId,
}: {
	children: JSX.Element;
	setProjectId: (projectId: string) => void;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();
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
			setProjectId(employee.email);
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

export default CustomeAssignee2;
