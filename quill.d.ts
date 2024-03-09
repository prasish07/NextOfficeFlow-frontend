declare module "quill/core" {
	import Quill from "quill";

	export default Quill;
}

declare module "quill/modules/resize" {
	const Resize: any;

	export default Resize;
}

declare module "quill/modules/display-size" {
	const DisplaySize: any;

	export default DisplaySize;
}

// In a .d.ts file in your project
declare module "quill-image-uploader";
