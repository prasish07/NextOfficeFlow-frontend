import useScreenWidth from "@/hooks/useScreenWidth";
import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Index = () => {
	const { isMobileView } = useScreenWidth();
	return (
		<div className="project">
			<h2 className="project__main-title">Projects</h2>
			<div className="project__info">
				<div className="project__info-item">
					<h2>Total</h2>
					<p>30</p>
				</div>
				<div className="project__info-item">
					<h2>Completed</h2>
					<p>30</p>
				</div>
				<div className="project__info-item">
					<h2>On-Going</h2>
					<p>30</p>
				</div>
				<div className="project__info-item">
					<h2>OverDue</h2>
					<p>30</p>
				</div>
				<div className="project__info-item">
					<h2>Cancel</h2>
					<p>30</p>
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
									<th>ID</th>
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
								<tr>
									<td>
										<input type="checkbox" />
									</td>
									<td>112</td>
									<td>Blog Website</td>
									{!isMobileView && (
										<>
											<td>21 july 2022</td>
											<td>21 july 2022</td>
											<td>P, A</td>
											<td>On Going</td>
										</>
									)}
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
			</div>
		</div>
	);
};

export default Index;
