import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/router";
import {
	deleteProject,
	removeProjects,
	useGetProjectList,
} from "@/query/project";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../model/DeleteModal";
import { toast } from "react-toastify";
import Assignee from "./Assignn";
import { useGlobalProvider } from "@/context/GlobalProvicer";

const ManageTable = ({
	setSelectedId,
	setCurrentTab,
	selectedId,
}: {
	setSelectedId: React.Dispatch<React.SetStateAction<string>>;
	setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
	selectedId: string;
}) => {
	const router = useRouter();
	const { data, isLoading } = useGetProjectList();
	const { isDesktopView, isTabletView } = useScreenWidth();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [search, setSearch] = useState("");
	const queryClient = useQueryClient();
	const [showModal, setShowModal] = useState(false);
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const isEmployee = role === "employee";
	const [assignee, setAssignee] = useState<any>(null);
	const [projectList, setProjectList] = useState<string[]>([]);

	const deleteMutation = useMutation({
		mutationFn: deleteProject,
		onSuccess: (data: any) => {
			toast.success(data.message);
			queryClient.invalidateQueries({
				queryKey: ["project list"],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const deleteManyMutation = useMutation({
		mutationFn: removeProjects,
		onSuccess: (data: any) => {
			toast.success(data.message);
			setProjectList([]);
			queryClient.invalidateQueries({
				queryKey: ["project list"],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) {
		return <div className="loader" />;
	}

	if (!data) {
		return <div>Error</div>;
	}

	const { projects } = data;

	const filteredProjects = projects.filter((project: any) =>
		project.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="project__manage">
			<div className="project__sub-header">
				{!isEmployee && (
					<button
						onClick={() => {
							deleteManyMutation.mutate(projectList);
						}}
					>
						Delete
					</button>
				)}
				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>
			<div className="project__manage-info">
				<table>
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={projectList.length === filteredProjects.length}
									onClick={() => {
										if (projectList.length === filteredProjects.length) {
											setProjectList([]);
										} else {
											setProjectList(
												filteredProjects.map((project: any) => project._id)
											);
										}
									}}
								/>
							</th>
							{isDesktopView && !isTabletView && <th>ID</th>}

							<th>Project Name</th>
							{isDesktopView && !isTabletView && (
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
						{filteredProjects.map((project: any) => {
							const formattedStartDate = new Date(
								project.startDate
							).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							});
							const formattedEndDate = new Date(
								project.endDate
							).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							});
							return (
								<tr key={project._id}>
									<td>
										<input
											type="checkbox"
											checked={projectList.includes(project._id)}
											onClick={() => {
												if (projectList.includes(project._id)) {
													setProjectList(
														projectList.filter((id) => id !== project._id)
													);
												} else {
													setProjectList([...projectList, project._id]);
												}
											}}
										/>
									</td>
									{isDesktopView && !isTabletView && <td>{project._id}</td>}
									<td>{project.title}</td>
									{isDesktopView && !isTabletView && (
										<>
											<td>{formattedStartDate}</td>
											<td>{formattedEndDate}</td>
											<td>
												<div className="flex justify-center items-center gap-2">
													{project.assigneeId?.map((item: any, index: any) => {
														return (
															<div
																key={item._id}
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
													{!isEmployee && (
														<FaUserPlus
															size={24}
															className="cursor-pointer"
															title="Add Assignee"
															onClick={() => {
																setSelectedId(project._id);
																setShowModal(true);
																setAssignee(project.assigneeId);
															}}
														/>
													)}
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
										{!isEmployee && (
											<>
												<button
													onClick={() => {
														setSelectedId(project._id);
														setCurrentTab("update");
													}}
												>
													<FaRegEdit />
												</button>
												<button
													onClick={() => {
														setSelectedId(project._id);
														setShowDeleteModal(true);
													}}
												>
													<FaRegTrashAlt />
												</button>
											</>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<DeleteModal
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				action={() => deleteMutation.mutate(selectedId)}
				title="Are you sure?"
			/>
			<Assignee
				showModal={showModal}
				setShowModal={setShowModal}
				projectId={selectedId}
				user={assignee}
			/>
		</div>
	);
};

export default ManageTable;
