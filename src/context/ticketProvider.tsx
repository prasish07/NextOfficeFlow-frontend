import { addCommentProject } from "@/query/project";
import {
	deleteTicket,
	removeTickets,
	updateTicketOneField,
} from "@/query/ticket";
import {
	UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ticketContextProps {
	selectedId: string;
	setSelectedId: React.Dispatch<React.SetStateAction<string>>;
	showDeleteModal: boolean;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	showAssigneeModal: boolean;
	setShowAssigneeModal: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	handleSelectChange: (
		e: React.ChangeEvent<HTMLSelectElement>,
		ticketId: string
	) => void;
	deleteTicketFunction: () => void;
	updateTicketFieldMutation: UseMutationResult<
		any,
		any,
		{
			ticketId: string;
			field: string;
			value: string;
		},
		unknown
	>;
	commentMutation: UseMutationResult<
		any,
		any,
		{
			field: string;
			endpoint: string;
			comment: string;
		},
		unknown
	>;
	comment: string;
	setComment: React.Dispatch<React.SetStateAction<string>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	selectedEmployee: {
		id: string;
		email: string;
	};
	setSelectedEmployee: React.Dispatch<
		React.SetStateAction<{
			id: string;
			email: string;
		}>
	>;
	ticketList: string[];
	setTicketList: React.Dispatch<React.SetStateAction<string[]>>;
	removeManyFunc: () => void;
}

export const TicketContext = createContext<ticketContextProps | undefined>(
	undefined
);

const TicketProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedId, setSelectedId] = useState<string>("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showAssigneeModal, setShowAssigneeModal] = useState(false);
	const [comment, setComment] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [selectedEmployee, setSelectedEmployee] = useState({
		id: "",
		email: "",
	});
	const [ticketList, setTicketList] = useState<string[]>([]);

	const [type, setType] = useState<string>("");
	const queryClient = useQueryClient();

	const updateTicketFieldMutation = useMutation({
		mutationFn: updateTicketOneField,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({ queryKey: ["ticket list"] });
			queryClient.invalidateQueries({ queryKey: ["ticket", selectedId] });
			toast.success(data.message);
			setComment("");
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteTicket,
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({ queryKey: ["ticket list"] });
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const removeManyTicketMutation = useMutation({
		mutationFn: removeTickets,
		onSuccess: () => {
			toast.success("Ticket deleted successfully");
			setTicketList([]);
			queryClient.invalidateQueries({ queryKey: ["ticket list"] });
		},
		onError: () => {
			toast.error("Failed to delete ticket");
		},
	});

	const removeManyFunc = () => {
		removeManyTicketMutation.mutate(ticketList);
	};

	const commentMutation = useMutation({
		mutationFn: addCommentProject,
		onSuccess: (data: any) => {
			toast.success(data.message);
			// setAddComment("");
			// queryClient.invalidateQueries({
			// 	queryKey: ["project comments", endpoint],
			// });
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		ticketId: string
	) => {
		const { name, value } = e.target;
		updateTicketFieldMutation.mutate({
			ticketId: ticketId,
			field: name,
			value,
		});
	};

	const deleteTicketFunction = () => {
		deleteMutation.mutate({ ticketId: selectedId });
	};

	return (
		<TicketContext.Provider
			value={{
				selectedId,
				setSelectedId,
				showDeleteModal,
				setShowDeleteModal,
				showModal,
				setShowModal,
				showAssigneeModal,
				setShowAssigneeModal,
				type,
				setType,
				handleSelectChange,
				deleteTicketFunction,
				updateTicketFieldMutation,
				commentMutation,
				comment,
				setComment,
				search,
				setSearch,
				selectedEmployee,
				setSelectedEmployee,
				ticketList,
				setTicketList,
				removeManyFunc,
			}}
		>
			{children}
		</TicketContext.Provider>
	);
};

export const useTicketProvider = () => {
	const context = useContext(TicketContext);

	if (!context) {
		throw new Error("useTicketProvider must be used within a TicketProvider");
	}

	return context;
};

export default TicketProvider;
