import React, { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaUserPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/router";
import { deleteProject, useGetProjectList } from "@/query/project";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../model/DeleteModal";
import { toast } from "react-toastify";
import Assignn from "./Assignn";

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
	const queryClient = useQueryClient();
	const [showModal, setShowModal] = useState(false);

	const deleteMutation = useMutation({
		mutationFn: deleteProject,
		onSuccess: (data: any) => {
			toast.success(data.message);
			queryClient.invalidateQueries({
				queryKey: ["project details", selectedId],
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

	return (
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
						{projects.map((project: any) => (
							<tr key={project.id}>
								<td>
									<input type="checkbox" />
								</td>
								{isDesktopView && !isTabletView && <td>{project._id}</td>}
								<td>{project.title}</td>
								{isDesktopView && !isTabletView && (
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
													onClick={() => {
														setSelectedId(project._id);
														setShowModal(true);
													}}
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
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<DeleteModal
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				action={() => deleteMutation.mutate(selectedId)}
				title="Are you sure?"
			/>
			<Assignn
				showModal={showModal}
				setShowModal={setShowModal}
				projectId={selectedId}
			/>
		</div>
	);
};

export default ManageTable;
