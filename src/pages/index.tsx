import React from "react";
import { GetServerSidePropsContext } from "next";
// import { useCheckRoleAndToken } from "@/hooks/auth";

const Home = () => {
	return <div>Dashboard</div>;
};

export default Home;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { req, res } = context;
	const { token } = req.cookies;
	if (!token) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
	// const data = useCheckRoleAndToken();
};
