import React, { createContext, useContext, useEffect, useState } from "react";

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
	handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handlePriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TicketContext = createContext<ticketContextProps | undefined>(
	undefined
);
const TicketProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedId, setSelectedId] = useState<string>("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showAssigneeModal, setShowAssigneeModal] = useState(false);
	const [type, setType] = useState<string>("");

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
	};

	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

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
				handleStatusChange,
				handlePriorityChange,
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
