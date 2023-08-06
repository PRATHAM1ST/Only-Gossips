// "use client";

// import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";

export default function New() {
	// const [gossip, setGossip] = useState("");
    // const [selection, setSelection] = useState({ start: 0, end: 0 });

	// const handleSelection = () => {
	// 	const selection = window.getSelection();
	// 	if (typeof selection?.anchorOffset === "number" && typeof selection?.focusOffset === "number" && selection?.anchorOffset !== selection?.focusOffset){
    //         setSelection({
    //             start: selection?.anchorOffset,
    //             end: selection?.focusOffset,
    //         });
    //     }

	// };

	// useEffect(() => {
	// 	document.addEventListener("selectionchange", handleSelection);
	// 	return () => {
	// 		document.removeEventListener("selectionchange", handleSelection);
	// 	};
	// }, []);

    // console.log('selection', selection);
	// const handleBold = () => {
	// 	if (!handleSelection) return;
	// 	setGossip(
	// 		gossip.slice(0, selection?.start) +
	// 			"<strong>" +
	// 			gossip.slice(selection?.start, selection?.end) +
	// 			"</strong>" +
	// 			gossip.slice(selection?.end)
	// 	);
	// };

	// const handleItalic = () => {
	// 	if (!handleSelection) return;
	// 	setGossip(
	// 		gossip.slice(0, selection?.start) +
	// 			"<i>" +
	// 			gossip.slice(selection?.start, selection?.end) +
	// 			"</i>" +
	// 			gossip.slice(selection?.end)
	// 	);
	// };

	// const handleUnderline = () => {
	// 	if (!handleSelection) return;
	// 	setGossip(
	// 		gossip.slice(0, selection?.start) +
	// 			"<u>" +
	// 			gossip.slice(selection?.start, selection?.end) +
	// 			"</u>" +
	// 			gossip.slice(selection?.end)
	// 	);
	// };

	return (
		<div className="container mx-auto px-4">
			<Header />
			<form className="grid gap-3">
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
					<div className="grid grid-cols-3 gap-2">
						<button
							className="bg-black text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-slate-900"
							// onClick={handleBold}
							type="button"
						>
							Bold
						</button>
						<button
							className="bg-black text-white rounded-md px-2 text-xs italic h-fit py-1 hover:bg-slate-900"
							// onClick={handleItalic}
							type="button"
						>
							Italic
						</button>
						<button
							className="bg-black text-white rounded-md px-2 text-xs underline h-fit py-1 hover:bg-slate-900"
							// onClick={handleUnderline}
							type="button"
						>
							Underline
						</button>
					</div>
					<textarea
						id="gossip"
						className="border-2 border-black rounded px-4 py-2 h-64"
						data-title="Gossip"
						name="gossip"
						// value={gossip}
						// onChange={(e) => setGossip(e.target.value)}
					/>
				</div>
				<div className="emojie-selection"></div>
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
