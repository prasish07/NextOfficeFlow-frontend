import {
	QueryClientProvider,
	QueryClient,
	QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error: any) => {
				if (
					error?.response?.status === 401 &&
					!router.pathname.includes("login")
				) {
					toast.error("You are not logged in");
					router.push("/login");
				}
			},
		}),
	});

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default TanstackProvider;
