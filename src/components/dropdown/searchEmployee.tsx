import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useGetAllEmployees } from "@/query/employee";

const SearchEmployee = ({
	children,
	setEmployee,
}: {
	children: JSX.Element;
	setEmployee: React.Dispatch<
		React.SetStateAction<{
			id: string;
			email: string;
		}>
	>;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();

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
			setEmployee({
				id: employee._id,
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

export default SearchEmployee;
