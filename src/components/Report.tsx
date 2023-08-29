"use client";

import React, { useState } from "react";
import { addPostReport } from "@/utils/addPostReport";

export default function Report({
	postId,
	userId,
}: {
	postId: string;
	userId: string;
}) {
	const [reportModal, setReportModal] = useState(false);
	const [reportReason, setReportReason] = useState("");

	const handleAddReport = () => {
		if (!userId) return;
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
						className="absolute modal-bg bg-white/[0.5] w-full h-full z-10 backdrop-blur-lg"
						onClick={() => {
							setReportModal(false);
							setReportReason("");
						}}
					></div>
					<form
						className="modal-input z-20 flex flex-col gap-4 justify-center items-center w-3/4"
						onSubmit={handleAddReport}
					>
						<textarea
							className="bg-white rounded border-2 border-red-500 outline-none focus:border-3 px-3 py-1 w-full h-40 resize-none"
							placeholder="Reason for Report"
							minLength={20}
							maxLength={200}
							value={reportReason}
							onChange={(e) => setReportReason(e.target.value)}
							required
						/>

						<div className="flex gap-3">
							<button
								className="report bg-red-500 hover:bg-red-700 rounded border-2 border-black px-3 py-1 text-white cursor-pointer"
								type="submit"
							>
								Submit
							</button>
							<button
								className="cancel mx-3 my-1 cursor-pointer"
								onClick={() => {
									setReportModal(false);
									setReportReason("");
								}}
							>
								Cancel
							</button>
						</div>
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
