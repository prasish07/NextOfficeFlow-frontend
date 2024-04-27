import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
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
	const isLoginPage = router.pathname.includes("/login");
	const initialLoad = useRef(true);

	const {
		data,
		isLoading: isUserDataLoading,
		refetch,
		isError,
	} = useLoginUserData(userInfo.userId);

	useEffect(() => {
		if (isLoading) {
			if (!isUserDataLoading) {
				if (data) {
					toast.success("You are logged in");
					setUserInfo({
						userId: data.response._id,
						role: data.response.role,
						email: data.response.email,
					});
					if (isLoginPage) router.push("/");
				} else if (isLoginPage) {
					return;
				} else {
					toast.error("You are not logged in");
					router.push("/login");
				}
				setIsLoading(false);
			}
		}
	}, [data, isLoading, isLoginPage, isUserDataLoading, router]);

	useEffect(() => {
		if (initialLoad.current) {
			initialLoad.current = false;
			refetch();
			setIsLoading(true);
		}
	}, [initialLoad, refetch]);

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
