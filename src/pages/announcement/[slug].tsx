import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
import {
	deleteAnnouncement,
	useGetSingleAnnouncement,
} from "@/query/announcement";
import { IoChevronBack } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import AnnouncementModel from "@/components/announcement";
import DeleteModal from "@/components/model/DeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGlobalProvider } from "@/context/GlobalProvicer";

const SinglePage = ({ endpoint }: { endpoint: string }) => {
	const {
		data: announcementData,
		isLoading,
		isError,
	} = useGetSingleAnnouncement(endpoint);
	const router = useRouter();
	const [showModel, setShowModel] = useState(false);
	const [showDeleteModel, setShowDeleteModel] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [type, setType] = useState("add");
	const queryClient = useQueryClient();
	const { role } = useGlobalProvider();
	const isProjectManager = role === "project manager";
	const isAdminOrHr = role === "admin" || role === "HR";

	const deleteAnnouncementMutation = useMutation({
		mutationFn: deleteAnnouncement,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["announcement"] });
			toast.success("Announcement deleted successfully");
			setShowDeleteModel(false);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	if (isLoading) return <div className="loader" />;

	if (isError || !announcementData) return <div>Something went wrong</div>;

	const { announcement } = announcementData;

	return (
		<div className="announcement__single-page">
			<div className="announcement__single-page--actions">
				<button
					onClick={() => {
						router.back();
					}}
				>
					<IoChevronBack size={34} />
				</button>
				{isAdminOrHr && (
					<div>
						<button
							title="Edit"
							onClick={() => {
								setShowModel(true);
								setType("edit");
								setSelectedId(endpoint);
							}}
						>
							<FaRegEdit size={24} />
						</button>
						<button
							title="Delete"
							onClick={() => {
								setShowDeleteModel(true);
								setSelectedId(endpoint);
							}}
						>
							<FaRegTrashAlt size={24} />
						</button>
					</div>
				)}
			</div>
			<h2>{announcement.title}</h2>
			<div
				className="announcement__element--content-wrapper"
				dangerouslySetInnerHTML={{ __html: announcement.content }}
			></div>
			<div className="announcement__element-footer mt-4">
				<h3 className="capitalize">
					- {announcement.employeeName} ({announcement.employeePosition})
				</h3>
				<div>
					{" "}
					<p>{announcement.date.split("T")[0]}</p> <span>--</span>
					<p>{announcement.endDate}</p>{" "}
				</div>{" "}
			</div>
			<AnnouncementModel
				showModel={showModel}
				setShowModel={setShowModel}
				type={type}
				selectedId={selectedId}
			/>
			<DeleteModal
				showModal={showDeleteModel}
				setShowModal={setShowDeleteModel}
				title="Delete Announcement?"
				action={() => {
					deleteAnnouncementMutation.mutate(selectedId);
				}}
			/>
		</div>
	);
};

export default SinglePage;

export const getServerSideProps: GetServerSideProps<{
	endpoint: string;
}> = async (context) => {
	const endpoint = context.query.slug as string;
	return {
		props: {
			endpoint,
		},
	};
};
