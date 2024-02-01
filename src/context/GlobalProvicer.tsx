import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalContextProps {
	isNavbarOpen: boolean;
	setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navbarRef: React.RefObject<HTMLDivElement>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
	undefined
);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const navbarRef = React.useRef<HTMLDivElement>(null);

	return (
		<GlobalContext.Provider
			value={{ isNavbarOpen, setIsNavbarOpen, navbarRef }}
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
