"use client";
import { checkUserExists } from "@/utils/checkUserExists";
import { createUser } from "@/utils/createUser";
import { useEffect } from "react";

export default function AuthSetter() {
	useEffect(() => {
		checkUserExists(String(localStorage.getItem("userId"))).then((res) => {
			if (!res) {
				createUser().then((res) => {
					localStorage.setItem("userId", res.id);
				});
			}
		});
	}, []);
	return <></>;
}
