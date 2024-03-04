// import { useLoginUserData } from "@/query/api";
// import { useRouter } from "next/navigation";

// export const useCheckRoleAndToken = () => {
// 	const router = useRouter();
// 	const { data, isLoading } = useLoginUserData();
// 	const role = data?.role;
// 	const userId = data?.userId;
// 	const isLogin = !!userId;

// 	if (!isLogin) {
// 		router.push("/login");
// 	}
// 	return data;
// };
