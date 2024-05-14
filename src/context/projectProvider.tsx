import React, { createContext, useContext, useEffect, useState } from "react";

interface projectContextProps {
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

export const ProjectContext = createContext<projectContextProps | undefined>(
	undefined
);
const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedId, setSelectedId] = useState<string>("");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showAssigneeModal, setShowAssigneeModal] = useState(false);
	const [type, setType] = useState<string>("");

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

	return (
		<ProjectContext.Provider
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
		</ProjectContext.Provider>
	);
};

export const useProjectProvider = () => {
	const context = useContext(ProjectContext);

	if (!context) {
		throw new Error("useProjectProvider must be used within a ProjectProvider");
	}

	return context;
};

export default ProjectProvider;
