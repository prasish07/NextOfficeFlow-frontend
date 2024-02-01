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

					<Script src="https://accounts.google.com/gsi/client" async />
					{/* </ThemeProvider> */}
				</GlobalProvider>
			</UserProvider>
		</TanstackProvider>
	);
}
