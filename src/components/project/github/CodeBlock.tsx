import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
	IoIosCopy,
	IoIosCheckmarkCircleOutline,
	IoIosNavigate,
} from "react-icons/io";
import { toast } from "react-toastify";
import Link from "next/link";

const CodeBlock = ({ link }: { link: string }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(link);
		toast.success("Copied to clipboard");
		setTimeout(() => {
			setIsCopied(false);
		}, 5000);
	};

	return (
		<div className="relative overflow-hidden rounded-[10px]">
			<Link
				href={link}
				className="absolute flex flex-row  top-[8px] right-[40px] p-2"
				title="Navigate to link"
			>
				<IoIosNavigate className="text-blue-500" size={24} />
			</Link>
			<button
				className="absolute flex flex-row top-[8px] right-0 p-2"
				onClick={handleCopy}
				title="Copy to clipboard"
			>
				{!isCopied ? (
					<IoIosCopy className="text-white" size={24} />
				) : (
					<IoIosCheckmarkCircleOutline className="text-green-200" size={24} />
				)}
			</button>
			<SyntaxHighlighter
				className="h-[80px] flex items-end code-block code-block__link"
				language="javascript"
				style={vs2015}
				wrapLines={true}
				wrapLongLines={true}
				showLineNumbers={false}
				showInlineLineNumbers={false}
			>
				{link}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
