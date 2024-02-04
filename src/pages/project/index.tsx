import useScreenWidth from "@/hooks/useScreenWidth";
import { useGetProjectCount, useGetProjectList } from "@/query/project";
import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/router";

const Index = () => {
	const { isMobileView } = useScreenWidth();
	const { data: count, isLoading: countLoading } = useGetProjectCount();
	const { data, isLoading } = useGetProjectList();
	const router = useRouter();

	if (countLoading || isLoading) {
		return <div className="loader" />;
	}

	if (!count || !data) {
		return <div>Error</div>;
	}

	const { toDo, total, completed, onGoing, overDue, cancel } = count;

	const { projects } = data;

	return (
		<div className="project">
			<h2 className="project__main-title">Projects</h2>
			<div className="project__info">
				<div className="project__info-item">
					<h2>To Do</h2>
					<p>{toDo}</p>
				</div>
				<div className="project__info-item">
					<h2>Total</h2>
					<p>{total}</p>
				</div>
				<div className="project__info-item">
					<h2>Completed</h2>
					<p>{completed}</p>
				</div>
				<div className="project__info-item">
					<h2>On-Going</h2>
					<p>{onGoing}</p>
				</div>
				<div className="project__info-item">
					<h2>OverDue</h2>
					<p>{overDue}</p>
				</div>
				<div className="project__info-item">
					<h2>Cancel</h2>
					<p>{cancel}</p>
				</div>
			</div>

			<div className="project__details">
				<div className="project__header">
					<button className="project__header-btn project__header-btn--active">
						All Projects
					</button>
					<button className="project__header-btn">New Projects</button>
				</div>
				<div className="project__manage">
					<div className="project__sub-header">
						<button>Delete</button>
						<input type="text" placeholder="Search" />
					</div>
					<div className="project__manage-info">
						<table>
							<thead>
								<tr>
									<th>
										<input type="checkbox" />
									</th>
									{!isMobileView && <th>ID</th>}

									<th>Project Name</th>
									{!isMobileView && (
										<>
											<th>Start Date</th>
											<th>End Date</th>
											<th>Assigned To</th>
											<th>Status</th>
										</>
									)}
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{projects.map((project: any) => (
									<tr key={project.id}>
										<td>
											<input type="checkbox" />
										</td>
										{!isMobileView && <td>{project._id}</td>}
										<td>{project.title}</td>
										{!isMobileView && (
											<>
												<td>{project.startDate}</td>
												<td>{project.endDate}</td>
												<td>
													<div className="flex justify-center items-center gap-2">
														{project.AssigneeId.map((item: any) => {
															return (
																<div
																	key={item.id}
																	className="project__manage-info--avatar"
																>
																	<p
																		className="capitalize w-[30px] h-[30px] rounded-[50%] bg-[#d2d2ec] text-[#5a4e4e] flex justify-center items-center font-bold cursor-pointer"
																		title={item.email}
																	>
																		{item.email[0]}
																	</p>
																</div>
															);
														})}
														<FaUserPlus
															size={24}
															className="cursor-pointer"
															title="Add Assignee"
														/>
													</div>
												</td>
												<td>{project.status}</td>
											</>
										)}
										<td>
											<button
												onClick={() => {
													router.push(`/project/${project._id}`);
												}}
											>
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
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
