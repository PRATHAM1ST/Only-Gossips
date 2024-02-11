"use client";

import React, { useState } from "react";
import { addPostReport } from "@/utils/Gossip/Report/addPostReport";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

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
			<Drawer>
				<DrawerTrigger>
					<Button
						variant={"outline"}
						size={"sm"}
						className="report border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
						onClick={() => setReportModal(true)}
					>
						Report
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<form
						className="m-auto"
						onSubmit={handleAddReport}
					>
						<DrawerHeader>
							<DrawerTitle>Are you absolutely sure?</DrawerTitle>
							<DrawerDescription>
								<Textarea
									className=" rounded border-2 border-red-500 outline-none focus:border-3 px-3 py-2 w-full sm:min-w-[500px] h-40 resize-none"
									placeholder="Reason for Report"
									minLength={20}
									maxLength={200}
									value={reportReason}
									onChange={(e) =>
										setReportReason(e.target.value)
									}
									required
								/>
							</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button type="submit" variant={"destructive"}>Submit</Button>
							<DrawerClose>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => {
										setReportModal(false);
										setReportReason("");
									}}
								>
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</DrawerContent>
			</Drawer>
		</>
	);
}
