"use client";

import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { sha1 } from "crypto-hash";

// {
//     "id": "uw-file3",
//     "batchId": "uw-batch2",
//     "asset_id": "c596902848fd4be275e39ade7a0f454b",
//     "public_id": "a9x6imxdmxkttjx5assj",
//     "version": 1693064739,
//     "version_id": "e442b0c273430ba6bfa20a1a9a1eebe7",
//     "signature": "8d0ca5461b1264ff838af756a3353c8f3163520a",
//     "width": 1224,
//     "height": 1632,
//     "format": "jpg",
//     "resource_type": "image",
//     "created_at": "2023-08-26T15:45:39Z",
//     "tags": [],
//     "bytes": 94009,
//     "type": "upload",
//     "etag": "bbd18943e82bcdd877cb308a8e11f9d1",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/dui2aldsv/image/upload/v1693064739/a9x6imxdmxkttjx5assj.jpg",
//     "secure_url": "https://res.cloudinary.com/dui2aldsv/image/upload/v1693064739/a9x6imxdmxkttjx5assj.jpg",
//     "folder": "",
//     "access_mode": "public",
//     "original_filename": "366346145_113993508441791_4552045723248126156_n",
//     "path": "v1693064739/a9x6imxdmxkttjx5assj.jpg",
//     "thumbnail_url": "https://res.cloudinary.com/dui2aldsv/image/upload/c_limit,h_60,w_90/v1693064739/a9x6imxdmxkttjx5assj.jpg"
// }

type UploadResponse = {
	event: string;
	info: {
		id: string;
		batchId: string;
		asset_id: string;
		public_id: string;
		version: number;
		version_id: string;
		signature: string;
		width: number;
		height: number;
		format: string;
		resource_type: string;
		created_at: string;
		tags: string[];
		bytes: number;
		type: string;
		etag: string;
		placeholder: boolean;
		url: string;
		secure_url: string;
		folder: string;
		access_mode: string;
		original_filename: string;
		path: string;
		thumbnail_url: string;
	};
};

export default function Upload() {
	const [uploadResponses, setUploadResponses] = useState<UploadResponse[]>(
		[]
	);

	const handleUpload = (e: any) => {
		setUploadResponses((prev) => [...prev, e]);
	};

	const handleDelete = async (public_id: string) => {
		const timestamp = new Date().getTime();
		const string = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
		const signature = await sha1(string);
		const formData = new FormData();
		formData.append("public_id", public_id);
		formData.append("signature", signature);
		formData.append("api_key", `${process.env.CLOUDINARY_API_KEY}`);
		formData.append("timestamp", `${timestamp}`);
		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/gossip/image/destroy",
			formData
		);
	};

	return (
		<div>
			<CldUploadButton
				uploadPreset="gossip"
				className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
				onUpload={handleUpload}
				options={{
					clientAllowedFormats: [
						"png",
						"gif",
						"jpeg",
						"jpg",
						"webp",
						"heic",
						"heif",
					],
					sources: [
						"local",
						"camera",
						"google_drive",
						"instagram",
						"facebook",
					],
				}}
			/>
			<div className="flex gap-3 my-4">
				{uploadResponses?.map((uploadResponse) => (
					<CldImage
						key={uploadResponse.info.id}
						height={uploadResponse.info.height}
						width={uploadResponse.info.width}
						src={uploadResponse.info.public_id}
						sizes="100vw"
						alt="Description of my image"
						onClick={() =>
							handleDelete(uploadResponse.info.public_id)
						}
						className="w-20"
					/>
				))}
			</div>
		</div>
	);
}
