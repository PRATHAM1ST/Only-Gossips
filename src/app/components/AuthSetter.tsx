"use client";
import { useEffect } from "react";

export default function AuthSetter() {
	useEffect(() => {
		if (localStorage.getItem("userId") === null) {
			fetch("http://localhost:3000/api/user/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                return res.json();
            }).then((data) => {
                localStorage.setItem("userId", data.id);
            });
		}
	}, []);
	return <></>;
}
