import Header from "@/components/header";
import EmployeeModal from "@/components/model/EmployeeModal";
import { Modal } from "@/components/model/Model";
import Navbar from "@/components/navbar";
import { deleteEmployee, useGetEmployeeData } from "@/query/employee";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { redirectToLogIn } from "@/utils/redirect";
import DeleteModal from "@/components/model/DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useScreenWidth from "@/hooks/useScreenWidth";

interface ResponseData {
	message: string;
}

const Manage = () => {
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
	const [state, setState] = useState("view");
	const { isMobileView } = useScreenWidth();

	const queryClient = useQueryClient();

	const handleAddEmployee = () => {
		setShowModal(true);
		setState("add");
	};

	const handleViewEmployee = (id: string) => {
		setShowModal(true);
		setSelectedEmployeeId(id);
		setState("view");
	};

	const handleUpdateEmployee = (id: string) => {
		setShowModal(true);
		setSelectedEmployeeId(id);
		setState("update");
	};

	const handleDeleteEmployee = (id: string) => {
		setShowDeleteModal(true);
		setSelectedEmployeeId(id);
	};

	const mutateDeleteEmployee = useMutation({
		mutationFn: deleteEmployee,
		onSuccess: (data: ResponseData) => {
			toast.success(data.message);
			queryClient.invalidateQueries({ queryKey: ["employee", 1] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const EmployeeTableBody = () => {
		const { data, isLoading, isError, error } = useGetEmployeeData();

		if (isLoading) {
			return <div>Loading...</div>;
		}

		if (!data || isError) {
			const axiosError = error as AxiosError;

			const errorMessage =
				(axiosError?.response?.data as ResponseData)?.message ??
				"An error occurred";

			return <h3 className="font-semibold">{errorMessage}</h3>;
		}

		const employeeData = data?.data || [];

		return (
			<>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Job Title</th>
							{!isMobileView && (
								<>
									<th>Department</th>
									<th>Date Of Hire</th>
									<th>Working Time</th>
									<th>Status</th>
								</>
							)}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{employeeData.map((item) => {
							const startDate = new Date(item.startDate);
							const formattedStartDate = startDate.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							});
							return (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.position}</td>
									{!isMobileView && (
										<>
											<td>{item.department}</td>
											<td>{formattedStartDate}</td>
											<td>
												{item.from} to {item.to}
											</td>
											<td>{item.status}</td>
										</>
									)}
									<td>
										<button onClick={() => handleViewEmployee(item._id)}>
											<GrView />
										</button>
										<button onClick={() => handleUpdateEmployee(item._id)}>
											<FaRegEdit />
										</button>
										<button onClick={() => handleDeleteEmployee(item._id)}>
											<FaRegTrashAlt />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</>
		);
	};

	return (
		<>
			<section className="employee">
				<div className="employee__header">
					<h2>Employee List</h2>
					<button onClick={handleAddEmployee}>Add Employee</button>
				</div>
				<div className="employee__details">
					<div className="employee__details--table">
						{<EmployeeTableBody />}
					</div>
				</div>
			</section>

			<EmployeeModal
				showModal={showModal}
				setShowModal={setShowModal}
				employeeFunctionality={state}
				employeeId={selectedEmployeeId}
			/>
			<DeleteModal
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				action={() => mutateDeleteEmployee.mutate(selectedEmployeeId)}
				title="Are you sure?"
			/>
		</>
	);
};

export default Manage;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const redirect = redirectToLogIn(context);

	if (redirect) {
		return redirect;
	}

	return {
		props: {},
	};
};
