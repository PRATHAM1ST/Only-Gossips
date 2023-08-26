"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { inter } from "../fonts";
import { getReactions } from "@/utils/getReactions";
import { RequestType, createPost } from "@/utils/createPost";
import Upload from "./components/upload";
import Header from "@/components/Header";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { Prisma } from "@prisma/client";

type Reactions = {
	id: string;
	emojie: string;
};

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

export default function New() {
	const [reactions, setReactions] = useState<Reactions[]>();
	const [gossip, setGossip] = useState<string>("");
	const [emojie, setEmojie] = useState<number>(0);
	const [postingDataLoading, setPostingDataLoading] =
		useState<boolean>(false);
	const [uploadResponses, setUploadResponses] = useState<UploadResponse[]>(
		[]
	);
	const handleUpload = (e: any) => {
		setUploadResponses((prev) => [...prev, e]);
	};
	const handleDelete = async (public_id: string) => {};

	useEffect(() => {
		if (process.env.NODE_ENV !== "development") {
			getReactions().then((data: Reactions[]) => {
				setReactions(data);
			});
		}
	}, []);

	function handleSubmit(formData: FormData) {
		setPostingDataLoading(true);
		const title = String(formData.get("title"));
		const content = gossip;
		const backgroundEmoji = String(formData.get("emojie"));
		const userId = String(localStorage.getItem("userId"));
		const data: RequestType = {
			title,
			content,
			backgroundEmoji,
			userId,
			images: uploadResponses,
		};

		createPost(data)
			.then((res) => {
				if (!res.sucess) {
					throw res.message;
				}
				formData.delete("title");
				formData.delete("emojie");
				setGossip("");

				window.location.href = "/";
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setPostingDataLoading(false);
			});
	}

	const handleChecked = (e: any) => {
		console.log("e", e.target.value);
	};

	return (
		<div className="container mx-auto px-4 max-w-4xl">
			<Header />
			<form
				className={`grid gap-3 max-w-2xl mx-auto ${
					postingDataLoading
						? "cursor-not-allowed select-none animate-pulse"
						: ""
				}`}
				action={handleSubmit}
			>
				<div className="input grid">
					<label htmlFor="title" className="font-bold">
						Title of the Gossip
					</label>
					<input
						id="title"
						type="text"
						className="border-2 border-black rounded px-4 py-1"
						data-title="Title of the Gossip"
						name="title"
						disabled={postingDataLoading}
						required
					/>
				</div>
				<div className="input grid gap-1">
					<label htmlFor="gossip" className="font-bold">
						Gossip
					</label>
					<ReactQuill
						className={`${
							inter.className
						} border-2 border-black rounded first:border-2 relative flex flex-col h-fit ${
							postingDataLoading
								? "cursor-not-allowed select-none"
								: ""
						}`}
						theme="snow"
						value={gossip}
						onChange={setGossip}
						placeholder="Write your gossip here..."
					/>
				</div>
				<div className="emojie-selection">
					<label htmlFor="gossip" className="font-bold">
						Background Reaction
					</label>
					<div className="flex gap-3 my-4">
						{reactions ? (
							reactions.map((reaction: any, idx: number) => (
								<span key={reaction.id}>
									<label
										className={`cursor-pointer ${
											emojie === idx
												? "text-3xl border-2 border-black rounded-full p-1"
												: "text-lg"
										}`}
										htmlFor={reaction.id}
									>
										{reaction.emojie}
									</label>
									<input
										key={reaction.id}
										id={reaction.id}
										className="peer hidden"
										type="radio"
										name="emojie"
										checked={emojie === idx}
										onChange={() => setEmojie(idx)}
										value={reaction.emojie}
										disabled={postingDataLoading}
									/>
								</span>
							))
						) : (
							<div className="animate-pulse flex gap-3 my-3">
								<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
								<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
								<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
								<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-3 items-center">
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

				<button
					className={`bg-black text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-slate-900`}
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
