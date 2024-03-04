import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const PAGE_NOT_FOUND_TITLE = "Hmm, Something’s Wrong!";

const PageNotFoundPage = () => {
	// Router goes here
	const { push } = useRouter();

	return (
		<>
			<div className="not-found">
				<h1>{PAGE_NOT_FOUND_TITLE}</h1>
				<p>Sorry, we couldn’t find the page you were looking for.</p>

				<Link href="/">Go back home</Link>
			</div>
		</>
	);
};

export default PageNotFoundPage;
