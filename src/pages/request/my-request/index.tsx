import React from "react";
import { MdSick } from "react-icons/md";

const MyRequest = () => {
	return (
		<div className="request__my">
			<h2 className="request__main-title">My Request</h2>
			<div className="request__my-options">
				<div className="request__my-options-element">
					<h3>Leave</h3>
				</div>
				<div className="request__my-options-element">
					<h3>Allowance</h3>
				</div>
				<div className="request__my-options-element">
					<h3>Overtime Request</h3>
				</div>
				<div className="request__my-options-element">
					<h3>Unities & Equipment</h3>
				</div>
			</div>

			<div className="request__list-count">
				<div>
					<h3>Leave</h3>
					<p>20</p>
				</div>
				<div>
					<h3>Allowance</h3>
					<p>18</p>
				</div>
				<div>
					<h3>Overtime Request</h3>
					<p>2</p>
				</div>
				<div>
					<h3>Unities & Equipment</h3>
					<p>0</p>
				</div>
			</div>

			<div className="request__filter">
				<h3>Filter</h3>
				<select name="filter" id="filter">
					<option value="this-month">This Month</option>
					<option value="last-month">Last Month</option>
					<option value="this-year">This Year</option>
					<option value="last-year">Last Year</option>
				</select>
			</div>

			<div className="request__list">
				<div className="request__list-element">
					<div className="request__list-element-1-header">
						<h2>Prasish Shrestha</h2>
						<p>Software Enginner</p>
					</div>
					<div className="request__list-element-2">
						<div className="request__list-element-header">
							<MdSick size={30} />
							<h3>Leave</h3>
							<p>1 Day</p>
						</div>
						<div className="request__list-element-footer">
							<h3>2021-10-10</h3>
							<p>Approved</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyRequest;
