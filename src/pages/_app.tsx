import type { AppProps } from "next/app";
import "@/assets/styles/globals.css";
import "@/assets/sass/style.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/context/UserProvider";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<TanstackProvider>
			<UserProvider>
				{/* <ThemeProvider> */}
				<ToastContainer />
				<Component {...pageProps} />
				<Script src="https://accounts.google.com/gsi/client" async />
				{/* </ThemeProvider> */}
			</UserProvider>
		</TanstackProvider>
	);
}
