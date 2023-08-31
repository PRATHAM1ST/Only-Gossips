"use client";
import { checkUserExists } from "@/utils/User/checkUserExists";
import { createUser } from "@/utils/User/createUser";
import { useEffect, useState } from "react";

export default function AuthSetter() {
	// Get userId from localStorage and set it in state
	const [userId, setUserId] = useState<string>("");

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setUserId(storedUserId);
		}
	}, []);
	
	useEffect(() => {
		if (!userId) return;
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
