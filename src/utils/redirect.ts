import { GetServerSidePropsContext } from "next";

export const redirectToLogIn = (context: GetServerSidePropsContext) => {
	const { req } = context;
	const { token } = req.cookies;

	console.log("asdf", token);

	if (!token) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return null;
};
