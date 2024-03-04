import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLoginUserData, userInfoProps } from "@/query/api";
import { useRouter } from "next/router";
import { getCookies } from "@/utils/cookies";

interface UserContextProps {
	isUserLoggedIn: boolean;
	userInfo: {
		userId: string;
		role: string;
	};
}

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: ReactNode }) => {
	// const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	// const [userInfo, setUserInfo] = useState({
	// 	userId: "",
	// 	role: "",
	// });
	const router = useRouter();

	return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

// create global provider
export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}

	return context;
};

export default UserProvider;
