import React, { useState } from "react";
import { Modal } from "./model/Model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { breakUpdate } from "@/query/attendance";
import { toast } from "react-toastify";

const BreakModel = ({ showTimeModal, setTimeShowModal, data }: any) => {
	const [breakTime, setBreakTime] = useState({
		breakIn: "",
		breakOut: "",
	});
	const queryClient = useQueryClient();

	const breakMutation = useMutation({
		mutationFn: breakUpdate,
		onSuccess: () => {
			toast.success("Break updated successfully");
			queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	return (
		<Modal
			size="md"
			shouldShowModal={showTimeModal}
			handleClose={() => setTimeShowModal(false)}
			header={<h2>Break</h2>}
		>
			<div>
				<div className="mb-4">
					<h3 className="font-bold mb-2">Previous Breaks</h3>
					{data?.breaks.map((item: any, index: number) => {
						const today = new Date();
						const breakInTimeParts = item.breakIn.split(":").map(Number);
						const breakOutTimeParts = item.breakOut.split(":").map(Number);
						const breakInTime = new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							breakInTimeParts[0],
							breakInTimeParts[1]
						);
						const breakOutTime = new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate(),
							breakOutTimeParts[0],
							breakOutTimeParts[1]
						);

						const durationMilliseconds =
							breakOutTime.getTime() - breakInTime.getTime();
						const durationMinutes = Math.round(
							durationMilliseconds / (1000 * 60)
						);
						const durationHours = Math.floor(durationMinutes / 60);
						const remainingMinutes = durationMinutes % 60;

						return (
							<div
								key={index}
								className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-2 mb-2"
							>
								<div>
									<p className="font-semibold">{item.breakIn}</p>
									<p className="text-sm text-gray-500">Break In</p>
								</div>
								<div>
									<p className="font-semibold">{item.breakOut}</p>
									<p className="text-sm text-gray-500">Break Out</p>
								</div>
								<div>
									<p className="font-semibold">
										{durationHours}h {remainingMinutes}m
									</p>
									<p className="text-sm text-gray-500">Duration</p>
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-4">
					<div className="flex gap-2 items-center">
						<label htmlFor="breakInTime" className="mb-1 font-semibold">
							Break In
						</label>
						<input
							type="time"
							id="breakInTime"
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => {
								setBreakTime({ ...breakTime, breakIn: e.target.value });
							}}
						/>
					</div>
					<div className="flex gap-2 items-center">
						<label htmlFor="breakOutTime" className="mb-1 font-semibold">
							Break Out
						</label>
						<input
							type="time"
							id="breakOutTime"
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => {
								setBreakTime({ ...breakTime, breakOut: e.target.value });
							}}
						/>
					</div>
				</div>
				<button
					onClick={() => {
						breakMutation.mutate(breakTime);
					}}
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 mt-5 py-2 rounded-md w-full"
				>
					Submit
				</button>
			</div>
		</Modal>
	);
};

export default BreakModel;
