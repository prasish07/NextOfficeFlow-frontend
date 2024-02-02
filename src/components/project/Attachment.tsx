import React, { useState } from "react";
import Dropzone from "../Dropzone";
import prasish from "@/assets/images/prasish.jpg";
import Image from "next/image";

const Attachment = () => {
	const [images, setImages] = useState<string[]>([]);
	return (
		<div className="project-id__attachment">
			<div className="project-id__attachment--header">
				<h3>Attachments</h3>
			</div>
			<div className="project-id__attachment--other-attachments">
				<div className="project-id__attachment--other-attachments-item">
					<div>
						<h3>John smith</h3>
					</div>
					<div className="project-id__attachment--other-attachments-item--images">
						<a href="https://res.cloudinary.com/dbq7xtdqg/image/upload/v1706805256/nextofficeflow/pm3srfbunnlu1lae0iuv.png">
							<Image src={prasish} alt="attachment" />
						</a>
						<a href="https://res.cloudinary.com/dbq7xtdqg/image/upload/v1706805256/nextofficeflow/pm3srfbunnlu1lae0iuv.png">
							<Image src={prasish} alt="attachment" />
						</a>
						<a href="https://res.cloudinary.com/dbq7xtdqg/image/upload/v1706805256/nextofficeflow/pm3srfbunnlu1lae0iuv.png">
							<Image src={prasish} alt="attachment" />
						</a>
						<a href="https://res.cloudinary.com/dbq7xtdqg/image/upload/v1706805256/nextofficeflow/pm3srfbunnlu1lae0iuv.png">
							<Image src={prasish} alt="attachment" />
						</a>
					</div>
				</div>
			</div>
			<form className="project-id__attachment--upload">
				<h2>Upload your images</h2>
				<Dropzone
					className="p-16 mt-10 border border-neutral-200"
					setImages={setImages}
				/>
				<div className="project-id__attachment--upload-btn">
					<button>Upload to this Project</button>
				</div>
			</form>
		</div>
	);
};

export default Attachment;
