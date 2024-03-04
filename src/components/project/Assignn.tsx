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
	const [searchValue, setSearchValue] = useState<string>("");

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

	let { data: employeeData } = data;

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

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	if (searchValue) {
		const filteredData = employeeData.filter((employee: any) =>
			employee.email.toLowerCase().includes(searchValue.toLowerCase())
		);
		employeeData = filteredData;
	}

	return (
		<>
			<Modal
				size="sm"
				shouldShowModal={showModal}
				handleClose={() => setShowModal(false)}
				header="Select Assignee"
				wrapperClass="assignee-modal"
			>
				<>
					{/* Add search bar */}
					<input
						type="text"
						placeholder="Search email"
						className="assignee-modal__search"
						onChange={(e) => {
							handleSearch(e);
						}}
						value={searchValue}
					/>
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
					<div className="mt-5 flex justify-center">
						<button type="submit" onClick={handleAdd} className="add-btn">
							Assign
						</button>
					</div>
				</>
			</Modal>
		</>
	);
};

export default Assignn;
