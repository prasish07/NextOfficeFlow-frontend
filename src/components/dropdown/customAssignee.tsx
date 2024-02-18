import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useGetAllEmployees } from "@/query/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAssignee } from "@/query/ticket";

const CustomAssignee = ({
	children,
	ticketId,
}: {
	children: JSX.Element;
	ticketId: string;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();
	const queryClient = useQueryClient();

	const [assignee, setAssignee] = useState<string>("");
	const assigneeMutation = useMutation({
		mutationFn: updateAssignee,
		onSuccess: () => {
			toast.success("Assignee added successfully");
			queryClient.invalidateQueries({ queryKey: ["ticket list", 1] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

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
			assigneeMutation.mutate({
				ticketId,
				assignee: employee._id,
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
