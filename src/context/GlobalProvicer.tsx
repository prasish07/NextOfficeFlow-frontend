import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalContextProps {
	isNavbarOpen: boolean;
	setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navbarRef: React.RefObject<HTMLDivElement>;
	userName: { name: string; email: string; position: string };
	setUserName: React.Dispatch<
		React.SetStateAction<{ name: string; email: string; position: string }>
	>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
	undefined
);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const navbarRef = React.useRef<HTMLDivElement>(null);
	const [userName, setUserName] = useState({
		name: "",
		email: "",
		position: "",
	});

	return (
		<GlobalContext.Provider
			value={{
				isNavbarOpen,
				setIsNavbarOpen,
				navbarRef,
				userName,
				setUserName,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

// create global provider
export const useGlobalProvider = () => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}

	return context;
};

export default GlobalProvider;
