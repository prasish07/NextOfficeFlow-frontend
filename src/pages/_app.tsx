import type { AppProps } from "next/app";
import "@/assets/styles/globals.css";
import "@/assets/sass/style.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleOAuthProvider clientId="384831560241-qcib9uur9bmq5g2rfdt41tft9ll8ucmh.apps.googleusercontent.com">
			<TanstackProvider>
				{/* <ThemeProvider> */}
				<ToastContainer />
				<Component {...pageProps} />
				{/* </ThemeProvider> */}
			</TanstackProvider>
		</GoogleOAuthProvider>
	);
}
