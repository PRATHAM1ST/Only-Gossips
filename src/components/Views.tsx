"use client";

import { useEffect } from "react";
import { increasePostViewCount } from "@/utils/increasePostViewCount";

export default function ViewsIncrementer({
	postId,
	views,
}: {
	postId: string;
	views: object[];
}) {
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (!userId) return;
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

	return <>{Number(views.length) + 1} Views</>;
}
