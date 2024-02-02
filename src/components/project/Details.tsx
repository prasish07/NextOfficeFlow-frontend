import React from "react";

const Details = () => {
	return (
		<div className="project-id__details">
			<div className="project-id__details--header">
				<h3>Project Details</h3>
				<button>Edit</button>
			</div>
			<div className="project-id__details--info">
				<div className="project-id__details--info-item">
					<h3>Project Id:</h3>
					<p>abc</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Project Name:</h3>
					<p>Project 1</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Start Date:</h3>
					<p>12/12/2021</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>End Date:</h3>
					<p>12/12/2021</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Assigned To:</h3>
					<p>John Doe</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Status:</h3>
					<p>Completed</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Description:</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
						voluptatum, quas, quos nemo, quod quia fugit quae doloribus
						aspernatur magnam.
					</p>
				</div>
				<div className="project-id__details--info-item">
					<h3>Completed Time:</h3>
					<p>Unknown</p>
				</div>
			</div>
		</div>
	);
};

export default Details;
