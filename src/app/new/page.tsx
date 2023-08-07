"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Oooh_Baby } from "next/font/google";
import Link from "next/link";

export default function New() {
	const [reactions, setReactions] = useState([]);
	const [gossip, setGossip] = useState("");
	const oooh_baby = Oooh_Baby({
		subsets: ["latin"],
		weight: "400",
	});

	useEffect(() => {
		fetch("http://localhost:3000/api/reaction")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}

				return res.json();
			})
			.then((data) => {
				setReactions(data);
			});
	}, []);

	function handleSubmit(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const title = formData.get("title");
		const emojie = formData.get("emojie");

		const data = {
			title: title,
			content: gossip,
			backgroundEmoji: emojie,
			userId: localStorage.getItem("userId"),
		};

		console.log("data", data);

		fetch("http://localhost:3000/api/post/create", {
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

	return (
		<div className="container mx-auto px-4 max-w-4xl">
			<header className="flex justify-between items-center my-5">
				<Link href="/" className={oooh_baby.className + " text-3xl"}>
					Goosip
				</Link>
			</header>
			<form
				className="grid gap-3 max-w-2xl mx-auto"
				onSubmit={handleSubmit}
			>
				<div className="input grid">
					<label htmlFor="title">Title of the Gossip</label>
					<input
						id="title"
						type="text"
						className="border-2 border-black rounded px-4 py-1"
						data-title="Title of the Gossip"
						name="title"
					/>
				</div>
				<div className="input grid gap-1">
					<label htmlFor="gossip">Gossip</label>
					<ReactQuill
						className="rounded h-64 mb-16 first:border-2"
						theme="snow"
						value={gossip}
						onChange={setGossip}
					/>
				</div>
				<div className="emojie-selection">
					{reactions.map((reaction: any, idx: number) => (
						<>
							<label
								className={`text-3xl cursor-pointer peer-checked/${reaction.id.replace(
									/[0-9]/g,
									""
								)}:text-lg`}
								htmlFor={reaction.id.replace(/[0-9]/g, "")}
							>
								{reaction.emojie}
							</label>
							<input
								key={reaction.id}
								id={reaction.id.replace(/[0-9]/g, "")}
								className={
									"peer/" + reaction.id.replace(/[0-9]/g, "")
								}
								type="radio"
								name="emojie"
								defaultChecked={idx === 0}
								value={reaction.emojie}
							/>
						</>
					))}
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
