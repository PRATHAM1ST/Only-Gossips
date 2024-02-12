import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: String(process.env.GITHUB_ID),
			clientSecret: String(process.env.GITHUB_SECRET),
		}),
		// ...add more providers here
	],
	session: {
		strategy: "jwt",
	},
	secret: String(process.env.NEXTAUTH_SECRET),
};
