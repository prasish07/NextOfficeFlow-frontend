import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLoginUserData } from "@/query/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface UserInfo {
	userId: string;
	role: string;
}

interface UserContextProps {
	isUserLoggedIn: boolean;
	userInfo: UserInfo | null;
}

export const UserContext = createContext<UserContextProps>({
	isUserLoggedIn: false,
	userInfo: null,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any>({
		userId: "",
		role: "",
		email: "",
	});
	const router = useRouter();
	const isLoginPage = router.pathname === "/login";

	const { data, isLoading: isUserDataLoading } = useLoginUserData(
		userInfo.userId
	);

	useEffect(() => {
		if (isLoading && !isLoginPage) {
			if (!isUserDataLoading) {
				if (data) {
					setUserInfo({
						userId: data.details._id,
						role: data.details.role,
						email: data.details.email,
					});
				} else {
					toast.error("You are not logged in");
					router.push("/login");
				}
				setIsLoading(false);
			}
		}
	}, [data, isLoading, isLoginPage, isUserDataLoading, router]);

	if (isLoading && !isLoginPage) {
		return (
			<div className="screen-loader">
				<div className="loader" />
			</div>
		);
	}

	return (
		<UserContext.Provider value={{ isUserLoggedIn: !!userInfo, userInfo }}>
			{children}
		</UserContext.Provider>
	);
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
