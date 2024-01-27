import Header from "@/components/header";
import EmployeeModal from "@/components/model/EmployeeModal";
import { Modal } from "@/components/model/Model";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Manage = () => {
	const [showModal, setShowModal] = useState(false);

	const handleAddEmployee = () => {
		setShowModal(true);
	};

	return (
		<>
			<EmployeeModal
				showModal={showModal}
				setShowModal={setShowModal}
				employeeFunctionality="addEmployee"
			/>
			<Header />
			<section className="flex w-[100%]">
				<Navbar />
				<section className="employee">
					<div className="employee__header">
						<h2>Employee List</h2>
						<button onClick={handleAddEmployee}>Add Employee</button>
					</div>
					<div className="employee__details">
						<div className="employee__details--table">
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Job Title</th>
										<th>Department</th>
										<th>Date Of Hire</th>
										<th>Working Time</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Prasish Shrestha</td>
										<td>Software Engineer</td>
										<td>V2</td>
										<td>21 April 2020</td>
										<td>9AM - 5PM</td>
										<td>Intern</td>
										<td>
											<button>
												<GrView />
											</button>
											<button>
												<FaRegEdit />
											</button>
											<button>
												<FaRegTrashAlt />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Manage;
