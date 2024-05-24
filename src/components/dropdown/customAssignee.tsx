import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useGetAllEmployees } from "@/query/employee";
import { useQueryClient } from "@tanstack/react-query";
import { useTicketProvider } from "@/context/ticketProvider";

const CustomAssignee = ({
	children,
	ticketId,
}: {
	children: JSX.Element;
	ticketId: string;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();
	const queryClient = useQueryClient();
	const { updateTicketFieldMutation } = useTicketProvider();

	const [assignee, setAssignee] = useState<string>("");

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
			setAssignee(employee._id);
			console.log(ticketId);

			updateTicketFieldMutation.mutate({
				ticketId,
				field: "assigneeId",
				value: employee._id,
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

export default CustomAssignee;
