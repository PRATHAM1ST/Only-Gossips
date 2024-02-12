"use client";
import { checkUserExists } from "@/utils/User/checkUserExists";
import { createUser } from "@/utils/User/createUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthSetter() {
	// Get userId from localStorage and set it in state
	const [userId, setUserId] = useState<string>("");
	const session = useSession();

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setUserId(storedUserId);
		}
	}, []);

	useEffect(() => {
		if (!session) return;
		checkUserExists(session?.data?.user?.email ?? "").then((id) => {
			if (id) {
				localStorage.setItem("userId", id);
				setUserId(id);
			}
		});
	}, [userId, session]);
	return <></>;
}
