import type { AppProps } from "next/app";
import "@/assets/styles/globals.css";
import "@/assets/sass/style.scss";
import TanstackProvider from "@/providers/TanstackProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/context/UserProvider";
import Script from "next/script";
import GlobalProvider from "@/context/GlobalProvicer";
import Header from "@/components/header";
import MenuBtn from "@/components/MenuBtn";
import useScreenWidth from "@/hooks/useScreenWidth";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
	const { isDesktopView } = useScreenWidth();
	const router = useRouter();
	const currentUrl = router.asPath;
	const isLogin = currentUrl.includes("login");

	return (
		<TanstackProvider>
			<UserProvider>
				<GlobalProvider>
					{/* <ThemeProvider> */}
					<ToastContainer />
					<GoogleOAuthProvider clientId="384831560241-qcib9uur9bmq5g2rfdt41tft9ll8ucmh.apps.googleusercontent.com">
						{isLogin ? (
							<Component {...pageProps} />
						) : (
							<>
								<Header />
								<section className="flex w-[100%]">
									<Navbar />
									{!isDesktopView && <MenuBtn />}
									<Component {...pageProps} />
								</section>
							</>
						)}
					</GoogleOAuthProvider>

					<Script src="https://accounts.google.com/gsi/client" async />
					{/* </ThemeProvider> */}
				</GlobalProvider>
			</UserProvider>
		</TanstackProvider>
	);
}
