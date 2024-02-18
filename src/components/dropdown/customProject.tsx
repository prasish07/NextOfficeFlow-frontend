import React, { useState } from "react";
import { DropdownPopover } from "./dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAssignee } from "@/query/ticket";
import { useGetProjectList } from "@/query/project";

const CustomProject = ({
	children,
	setProjectId,
}: {
	children: JSX.Element;
	setProjectId: (projectId: string) => void;
}) => {
	const { data, isLoading, isError } = useGetProjectList();
	const queryClient = useQueryClient();

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;
	const { projects } = data;

	const dropdownContent = projects.map((project: any) => ({
		labelElement: (
			<div key={project._id} style={{ width: 100, padding: 16 }}>
				{project.title}
			</div>
		),
		callBack: () => {
			setProjectId(project._id);
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

export default CustomProject;
