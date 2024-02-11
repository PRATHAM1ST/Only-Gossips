import "./globals.css";
import type { Metadata } from "next";
import AuthSetter from "../components/Auth/AuthSetter";
import { inter } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<AuthSetter />
			</body>
		</html>
	);
}
