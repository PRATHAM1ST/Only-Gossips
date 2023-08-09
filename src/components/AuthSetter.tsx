"use client";
import { createUser } from "@/utils/createUser";
import { useEffect } from "react";

export default function AuthSetter() {
	useEffect(() => {
		if (localStorage.getItem("userId") === null) {
			createUser().then((res) => {
                localStorage.setItem("userId", res.id);
            });
		}
	}, []);
	return <></>;
}
