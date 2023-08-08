"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { inter, oooh_baby } from "../fonts";
import { getReactions } from "@/utils/getReactions";

type Reactions = {
	id: string;
	emojie: string;
};

export default function New() {
	const [reactions, setReactions] = useState<Reactions[]>();
	const [gossip, setGossip] = useState("");
	const [emojie, setEmojie] = useState(0);

	useEffect(() => {
		getReactions().then((data: Reactions[]) => {
			setReactions(data);
		});
	}, []);

	function handleSubmit(e: any) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", e.target.title.value);
		formData.append("emojie", e.target.emojie.value);
		formData.append("gossip", gossip);

		const data = {
			title: formData.get("title"),
			content: gossip,
			backgroundEmoji: formData.get("emojie"),
			userId: localStorage.getItem("userId"),
		};

		console.log("data", data);

		fetch("/api/post/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Failed to fetch data");
			}
			setGossip("");
			e.target.reset();
			window.location.href = "/";
		});
	}

	const handleChecked = (e: any) => {
		console.log("e", e.target.value);
	};

	return (
		<div className="container mx-auto px-4 max-w-4xl">
			<header className="flex justify-between items-center my-5">
				<Link href="/" className={oooh_baby.className + " text-3xl"}>
					Goosip
				</Link>
				<Link
					href="/"
					className="bg-red-500 text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-red-900"
				>
					Cancel
				</Link>
			</header>
			<form
				className="grid gap-3 max-w-2xl mx-auto"
				onSubmit={handleSubmit}
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
						required
					/>
				</div>
				<div className="input grid gap-1">
					<label htmlFor="gossip" className="font-bold">
						Gossip
					</label>
					<ReactQuill
						className={
							inter.className +
							" border-2 border-black rounded h-64 first:border-2 relative flex flex-col"
						}
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
						{reactions?.map((reaction: any, idx: number) => (
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
								/>
							</span>
						))}
					</div>
				</div>
				<button
					className="bg-black text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-slate-900"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
