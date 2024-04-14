import {
	QueryClientProvider,
	QueryClient,
	QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error: any) => {
				if (error?.response?.status === 401) {
					console.log("401 error");
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
