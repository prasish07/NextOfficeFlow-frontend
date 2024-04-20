import { useGlobalProvider } from "@/context/GlobalProvicer";
import { useTicketProvider } from "@/context/ticketProvider";
import useScreenWidth from "@/hooks/useScreenWidth";
import React from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import CustomAssignee from "../dropdown/customAssignee";
import { useMutation } from "@tanstack/react-query";
import { updateTicketOneField } from "@/query/ticket";
import { toast } from "react-toastify";
import DeleteModal from "../model/DeleteModal";

const Table = ({ tickets, status }: { tickets: any; status: string }) => {
	const {
		handleSelectChange,
		setSelectedId,
		setShowModal,
		setShowAssigneeModal,
		showDeleteModal,
		setShowDeleteModal,
		setType,
		deleteTicketFunction,
		search,
	} = useTicketProvider();
	const { isDesktopView, isTabletView } = useScreenWidth();
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const isEmployee = role === "employee";

	if (status !== "all")
		tickets = tickets.filter((ticket: any) => ticket.status === status);

	const filter = tickets.filter((ticket: any) =>
		ticket.title.toLowerCase().includes(search.toLowerCase())
	);

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
							{filter.map((ticket: any) => {
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
														onChange={(e) => {
															handleSelectChange(e, ticket._id);
														}}
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
														disabled={!isProjectManager}
														onChange={(e) => {
															handleSelectChange(e, ticket._id);
														}}
													>
														<option value="low">Low</option>
														<option value="medium">Medium</option>
														<option value="high">High</option>
													</select>
												</td>
												<td>
													<div className="flex justify-center items-center gap-2">
														{!isEmployee ? (
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
														) : (
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
															</div>
														)}
													</div>
												</td>
												<td>{formattedDueDate}</td>
											</>
										)}
										<td>
											<div className="ticket__manage--btns">
												<button
													onClick={() => {
														setSelectedId(ticket._id);
														setType("update");
														setShowModal(true);
													}}
												>
													<FaRegEdit />
												</button>
												{!isEmployee && (
													<button
														onClick={() => {
															setSelectedId(ticket._id);
															setShowDeleteModal(true);
														}}
													>
														<FaRegTrashAlt />
													</button>
												)}
											</div>
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
			<DeleteModal
				setShowModal={setShowDeleteModal}
				title="Are you sure?"
				showModal={showDeleteModal}
				action={deleteTicketFunction}
			/>
		</>
	);
};

export default Table;
