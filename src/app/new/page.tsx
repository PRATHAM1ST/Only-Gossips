"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { inter, oooh_baby, margurite, gotham } from "../fonts";
import { getReactions } from "@/utils/getReactions";
import { RequestType, createPost } from "@/utils/createPost";
import Upload from "./components/upload";

type Reactions = {
	id: string;
	emojie: string;
};

export default function New() {
	const [reactions, setReactions] = useState<Reactions[]>();
	const [gossip, setGossip] = useState<string>("");
	const [emojie, setEmojie] = useState<number>(0);
	const [postingDataLoading, setPostingDataLoading] =
		useState<boolean>(false);

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
			<header className="flex justify-between items-center my-5">
				<Link href="/" className={"text-3xl"}>
					<span className={gotham.className}>Only</span>
					<span className={margurite.className + " text-sky-500"}>Goosips</span>
				</Link>
				<Link
					href="/"
					className="bg-red-500 text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-red-900"
				>
					Cancel
				</Link>
			</header>
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

				<Upload />

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
