import "./globals.css";
import type { Metadata } from "next";
import AuthSetter from "../components/Auth/AuthSetter";
import { inter } from "./fonts";

export const metadata: Metadata = {
	title: "Only Gossips",
	description: "A social media platform for gossiping",
	openGraph: {
		images: ["/api/og"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<AuthSetter />
			</body>
		</html>
	);
}
