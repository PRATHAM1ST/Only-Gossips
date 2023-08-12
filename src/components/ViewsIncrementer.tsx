"use client";

import { use, useEffect } from "react";
import { increasePostViewCount } from "@/utils/increasePostViewCount";

export default function ViewsIncrementer({ postId }: { postId: string }) {
	
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId !== null) return;
		if (process.env.NODE_ENV !== "development") {
			increasePostViewCount({
				postId: postId,
				userId: String(userId),
			})
				.then((res) => {
					if (res.success) throw new Error(res.message);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [postId]);

	return <></>;
}
