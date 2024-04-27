import React, { useEffect, useState } from "react";
import { Modal } from "../model/Model";
import { addAssignee, useGetAllEmployees } from "@/query/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SelectAssignee = ({
	showModal,
	setShowModal,
	setAssignee,
	assignee,
}: {
	showModal: boolean;
	setShowModal: (type: boolean) => void;
	setAssignee: React.Dispatch<
		React.SetStateAction<
			{
				_id: string;
				email: string;
			}[]
		>
	>;
	assignee: {
		_id: string;
		email: string;
	}[];
}) => {
	const { data, isLoading, isError } = useGetAllEmployees();
	const [searchValue, setSearchValue] = useState<string>("");

	const [user, setUser] = useState([
		{
			_id: "",
			email: "",
		},
	]);

	const queryClient = useQueryClient();

	useEffect(() => {
		setUser([...assignee]);
	}, [assignee]);

	if (isLoading) return <div className="loader" />;

	if (isError || !data) return <div>Error</div>;

	let { data: employeeData } = data;

	const handleCheckboxChange = ({
		_id: employeeId,
		email: employeeEmail,
	}: {
		_id: string;
		email: string;
	}) => {
		const isExist = user.filter((item) => item._id === employeeId).length > 0;
		if (isExist) {
			setUser(user.filter((item) => item._id !== employeeId));
		} else {
			setUser([...user, { _id: employeeId, email: employeeEmail }]);
		}
	};

	const handleAdd = () => {
		if (user.length) {
			setAssignee((prev) => {
				// Only store unique id
				const uniqueAssignee = user.filter(
					(item, index, self) =>
						index === self.findIndex((t) => t._id === item._id)
				);
				return [...uniqueAssignee];
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
						{employeeData.map((employee: any) => {
							console.log(employee);

							return (
								<div key={employee._id} className="assignee-element">
									<input
										type="checkbox"
										id={employee._id}
										name={employee.name}
										value={employee._id}
										checked={
											assignee.filter((item) => item._id === employee._id)
												.length > 0 ||
											user.filter((item) => item._id === employee._id).length >
												0
										}
										onChange={() =>
											handleCheckboxChange({
												_id: employee._id,
												email: employee.email,
											})
										}
									/>
									<label htmlFor={employee._id}>{employee.email}</label>
								</div>
							);
						})}
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

export default SelectAssignee;
