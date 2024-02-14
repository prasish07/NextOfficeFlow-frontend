import React, { useState } from "react";
import { Modal } from "../model/Model";
import { addAssignee, useGetAllEmployees } from "@/query/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Assignn = ({
	showModal,
	setShowModal,
	projectId,
}: {
	showModal: boolean;
	setShowModal: (type: boolean) => void;
	projectId: string;
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();

	const [assignee, setAssignee] = useState<string[]>([]);
	const queryClient = useQueryClient();

	const addAssigneeMutation = useMutation({
		mutationFn: addAssignee,
		onSuccess: () => {
			toast.success("Assignee added successfully");
			queryClient.invalidateQueries({ queryKey: ["project list", 1] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	const { data: employeeData } = data;

	const handleCheckboxChange = (employeeId: string) => {
		if (assignee.includes(employeeId)) {
			setAssignee((prevAssignee) =>
				prevAssignee.filter((id) => id !== employeeId)
			);
		} else {
			setAssignee((prevAssignee) => [...prevAssignee, employeeId]);
		}
	};

	const handleAdd = () => {
		if (!!assignee.length) {
			addAssigneeMutation.mutate({
				assigneeIds: assignee,
				projectId,
			});
			setShowModal(false);
		}
	};

	return (
		<>
			<Modal
				size="sm"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header="Select Assignee"
			>
				<>
					<div className="assignee-list">
						{employeeData.map((employee: any) => (
							<div key={employee._id} className="assignee-element">
								<input
									type="checkbox"
									id={employee._id}
									name={employee.name}
									value={employee._id}
									checked={assignee.includes(employee._id)}
									onChange={() => handleCheckboxChange(employee._id)}
								/>
								<label htmlFor={employee._id}>{employee.email}</label>
							</div>
						))}
					</div>
					<div className="add-btn mt-5">
						<button type="submit" onClick={handleAdd}>
							Assign
						</button>
					</div>
				</>
			</Modal>
		</>
	);
};

export default Assignn;
