import { getCookies } from "@/utils/cookies";
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/router";

interface GlobalContextProps {
	isNavbarOpen: boolean;
	setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navbarRef: React.RefObject<HTMLDivElement>;
	userName: { name: string; email: string; position: string };
	setUserName: React.Dispatch<
		React.SetStateAction<{ name: string; email: string; position: string }>
	>;
	role: string;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
	undefined
);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { pathname } = router;
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const navbarRef = React.useRef<HTMLDivElement>(null);
	const [userName, setUserName] = useState({
		name: "",
		email: "",
		position: "",
	});
	const [isLoading, setIsLoading] = useState(true);
	const role = getCookies("role") as string;
	let isLoginPage = pathname.includes("login");

	// get role from token
	useEffect(() => {
		if (role) {
			setIsLoading(false);
		}
	}, [role]);

	if (isLoading && !isLoginPage) {
		return <div className="loader" />;
	}

	return (
		<GlobalContext.Provider
			value={{
				isNavbarOpen,
				setIsNavbarOpen,
				navbarRef,
				userName,
				setUserName,
				role,
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
