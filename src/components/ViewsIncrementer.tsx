"use client";

import { use, useEffect } from "react";
import { increasePostViewCount } from "@/utils/increasePostViewCount";

export default function ViewsIncrementer({ postId }: { postId: string }) {
	const userId = String(localStorage.getItem("userId"));

	useEffect(() => {
		if (userId !== null) return;
		if (process.env.NODE_ENV !== "development") {
			increasePostViewCount({
				postId: postId,
				userId: userId,
			})
				.then((res) => {
					if (res.success) throw new Error(res.message);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [userId, postId]);

	return <></>;
}
