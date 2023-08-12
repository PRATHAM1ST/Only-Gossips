"use client";

import React, { useState } from "react";
import { addPostReport } from "@/utils/addPostReport";

export default function Report({ postId }: { postId: string }) {
	const userId = String(localStorage.getItem("userId"));
	const [reportModal, setReportModal] = useState(false);
	const [reportReason, setReportReason] = useState("");

	const handleAddReport = () => {
		if (
			!reportReason &&
			reportReason.length < 10 &&
			reportReason.length > 200
		) {
			return;
		}
		addPostReport({
			postId: postId,
			userId: userId,
			reason: reportReason,
		})
			.then((res) => {
				if (!res.success) {
					throw res.message;
				}
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setReportModal(false);
				setReportReason("");
			});
	};

	return (
		<>
			{/* create a model which pop up when report button clicks */}

			{reportModal && (
				<div className="report-modal w-full h-full absolute top-0 left-0 overflow-hidden flex justify-center items-center">
					<div
						className="absolute modal-bg bg-red-300/[0.5] w-full h-full z-10 backdrop-blur-lg"
						onClick={() => {
							setReportModal(false);
							setReportReason("");
						}}
					></div>
					<form className="modal-input z-20 flex gap-4 justify-center items-center">
						<input
							className="bg-white rounded border-2 border-black px-3 py-1"
							type="text"
							placeholder="Reason for Report"
							minLength={20}
							maxLength={200}
							value={reportReason}
							onChange={(e) => setReportReason(e.target.value)}
						/>
						<button
							className="report bg-black rounded border-2 border-black px-3 py-1 text-white cursor-pointer"
							onClick={handleAddReport}
						>
							Submit
						</button>
					</form>
				</div>
			)}

			<button
				className="report border-red-500 rounded border-2 px-3 py-1 text-red-500 text-xs cursor-pointer"
				onClick={() => setReportModal(true)}
			>
				Report
			</button>
		</>
	);
}
