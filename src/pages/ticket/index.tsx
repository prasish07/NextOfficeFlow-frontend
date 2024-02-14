import DeleteModal from "@/components/model/DeleteModal";
import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetTicketList } from "@/query/ticket";
import TicketModal from "@/components/ticket/TicketModal";

const Index = () => {
	const router = useRouter();
	const { isDesktopView, isTabletView } = useScreenWidth();
	const [selectedId, setSelectedId] = useState<string>("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showAssigneeModal, setShowAssigneeModal] = useState(false);
	const { data, isLoading, isError } = useGetTicketList();
	const [type, setType] = useState<string>("");

	if (isLoading) {
		return <div className="loader" />;
	}

	if (isError || !data) {
		return <div>Error</div>;
	}

	const { tickets } = data;

	return (
		<div className="ticket">
			<h2 className="ticket__main-title">Tickets</h2>
			<div className="ticket__details">
				<h2>Ticket Backlog</h2>
				<button className="add-btn">New Ticket</button>
			</div>
			<div className="ticket__manage">
				<div className="ticket__sub-header">
					<button>Delete</button>
					<input type="text" placeholder="Search" />
				</div>
				<div className="ticket__manage-info">
					<table>
						<thead>
							<tr>
								<th>
									<input type="checkbox" />
								</th>
								{isDesktopView && !isTabletView && <th>ID</th>}

								<th>Ticket title</th>
								{isDesktopView && !isTabletView && (
									<>
										<th>Status</th>
										<th>Priority</th>
										<th>Assigned To</th>
										<th>Due Date</th>
									</>
								)}
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tickets.map((ticket: any) => (
								<tr key={ticket.id}>
									<td>
										<input type="checkbox" />
									</td>
									{isDesktopView && !isTabletView && <td>{ticket._id}</td>}
									<td>{ticket.title}</td>
									{isDesktopView && !isTabletView && (
										<>
											<td>{ticket.status}</td>
											<td>{ticket.priority}</td>
											<td>
												<div className="flex justify-center items-center gap-2">
													{ticket.assigneeId && (
														<div className="project__manage-info--avatar">
															<p
																className="capitalize w-[30px] h-[30px] rounded-[50%] bg-[#d2d2ec] text-[#5a4e4e] flex justify-center items-center font-bold cursor-pointer"
																title={ticket.assigneeId.email}
															>
																{ticket.assigneeId?.email[0]}
															</p>
														</div>
													)}

													{!ticket.assigneeId && (
														<FaUserPlus
															size={24}
															className="cursor-pointer"
															title="Add Assignee"
															onClick={() => {
																setSelectedId(ticket._id);
																setShowModal(true);
															}}
														/>
													)}
												</div>
											</td>
											<td>{ticket.status}</td>
										</>
									)}
									<td>
										<button
											onClick={() => {
												// router.push(`/project/${ticket._id}`);
												setSelectedId(ticket._id);
												setType("view");
												setShowModal(true);
											}}
										>
											<GrView />
										</button>
										<button
											onClick={() => {
												setSelectedId(ticket._id);
												setType("update");
												setShowModal(true);
											}}
										>
											<FaRegEdit />
										</button>
										<button
											onClick={() => {
												setSelectedId(ticket._id);
												setShowDeleteModal(true);
											}}
										>
											<FaRegTrashAlt />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* <DeleteModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					action={() => deleteMutation.mutate(selectedId)}
					title="Are you sure?"
				/> */}
				<TicketModal
					showModal={showModal}
					setShowModal={setShowModal}
					type={type}
				/>
			</div>
		</div>
	);
};

export default Index;
