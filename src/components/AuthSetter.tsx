"use client";
import { checkUserExists } from "@/utils/checkUserExists";
import { createUser } from "@/utils/createUser";
import { useEffect, useState } from "react";

export default function AuthSetter() {
	const [userId, setUserId] = useState<string>(
		String(localStorage.getItem("userId"))
	);
	useEffect(() => {
		checkUserExists(userId).then((res) => {
			if (!res) {
				createUser().then((res) => {
					localStorage.setItem("userId", res.id);
					setUserId(res.id);
				});
			}
		});
	}, [userId]);
	return <></>;
}
