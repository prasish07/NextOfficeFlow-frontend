import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useTicketProvider } from "@/context/ticketProvider";
import useScreenWidth from "@/hooks/useScreenWidth";
import React from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import CustomAssignee from "../dropdown/customAssignee";

const Table = ({ tickets, status }: { tickets: any; status: string }) => {
	const {
		handlePriorityChange,
		handleStatusChange,
		setSelectedId,
		setShowModal,
		setShowAssigneeModal,
		setShowDeleteModal,
		setType,
	} = useTicketProvider();
	const { isDesktopView, isTabletView } = useScreenWidth();
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";

	if (status !== "all")
		tickets = tickets.filter((ticket: any) => ticket.status === status);
	console.log(status);
	return (
		<>
			{!!tickets.length ? (
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
							{tickets.map((ticket: any) => {
								const formattedDueDate = new Date(
									ticket.dueDate
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								});
								return (
									<tr key={ticket.id}>
										<td>
											<input type="checkbox" />
										</td>
										{isDesktopView && !isTabletView && <td>{ticket._id}</td>}
										<td>{ticket.title}</td>
										{isDesktopView && !isTabletView && (
											<>
												<td>
													<select
														name="status"
														id="status"
														value={ticket.status}
														// defaultValue={status}
														onChange={handleStatusChange}
													>
														<option value="To-Do">To-Do</option>
														<option value="In-Progress">In-Progress</option>
														<option value="Completed">Completed</option>
														<option value="Cancelled">Cancelled</option>
														<option value="Reopen">Reopen</option>
													</select>
												</td>
												<td>
													<select
														name="priority"
														id="priority"
														value={ticket.priority}
														onChange={handlePriorityChange}
														disabled={!isProjectManager}
													>
														<option value="low">Low</option>
														<option value="medium">Medium</option>
														<option value="high">High</option>
													</select>
												</td>
												<td>
													<div className="flex justify-center items-center gap-2">
														<CustomAssignee ticketId={ticket._id}>
															<div>
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
																	/>
																)}
															</div>
														</CustomAssignee>
													</div>
												</td>
												<td>{formattedDueDate}</td>
											</>
										)}
										<td>
											<button
												onClick={() => {
													setSelectedId(ticket._id);
													setType("update");
													setShowModal(true);
												}}
											>
												<FaRegEdit />
											</button>
											{isProjectManager && (
												<button
													onClick={() => {
														setSelectedId(ticket._id);
														setShowDeleteModal(true);
													}}
												>
													<FaRegTrashAlt />
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<p className="empty">No tickets available for this status</p>
			)}
		</>
	);
};

export default Table;
