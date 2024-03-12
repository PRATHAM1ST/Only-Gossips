import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
	return (
		<div className="flex flex-col min-h-[100dvh] container mb-5 mx-auto px-4">
			<Header />
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Share your Gossips Anonymously
							</h1>
							<p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								The modern platform for sharing gossips.
								Completely anonymous. Share your thoughts
								without any fear.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Link href={"/page/1"}>
								<Button size="lg">Get Started</Button>
							</Link>
							<Link href={"/new"}>
								<Button size="lg" variant={"outline"}>Add Gossip</Button>
							</Link>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								How it works
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Share your gossips in three simple steps.
								Completely anonymous. No registration required.
							</p>
						</div>
						<div className="grid gap-4 md:gap-8 lg:gap-16 sm:grid-cols-3 items-stretch justify-center [&>div]:bg-white dark:[&>div]:bg-gray-950">
							<div className="flex flex-col gap-2 items-center justify-center p-4 sm:p-8">
								<GlobeIcon className="w-20 h-20" />
								<h3 className="text-xl font-bold">Step 1</h3>
								<p>Compose your gossip</p>
							</div>
							<div className="flex flex-col gap-2 items-center justify-center p-4 sm:p-8">
								<SendIcon className="w-20 h-20" />
								<h3 className="text-xl font-bold">Step 2</h3>
								<p>Click send. Your gossip is on its way!</p>
							</div>
							<div className="flex flex-col gap-2 items-center justify-center p-4 sm:p-8">
								<InboxIcon className="w-20 h-20" />
								<h3 className="text-xl font-bold">Step 3</h3>
								<p>Read other gossips!</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Subscribe to Only Gossips
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								The modern platform for sharing gossips.
								Completely anonymous. Share your thoughts
								without any fear.
								<br /> Subscribe to get notified.
							</p>
						</div>
						<form className="mx-auto w-full max-w-sm flex flex-col gap-2">
							<Input
								className="max-w-sm"
								placeholder="Enter your email"
								type="email"
							/>
							<Button size="lg">Sign Up</Button>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Sign up to get notified when we launch.
								<Link
									className="underline underline-offset-2"
									href="#"
								>
									Terms & Conditions
								</Link>
							</p>
						</form>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Testimonials
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Our users love the platform. Here&rsquo;s what
								they have to say.
							</p>
						</div>
						<div className="mx-auto w-full max-w-lg grid gap-4 items-start justify-center text-left sm:grid-cols-2">
							<div className="space-y-2">
								<p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">
									John Doe
								</p>
								<p className="font-bold">
									This platform is amazing. I can share my
									gossips without worrying about anyone
									finding out. 10/10.
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">
									Jane Smith
								</p>
								<p className="font-bold">
									I love the simplicity of Only Gossips.
									It&rsquo;s so easy to use. I can share my
									gossips with my friends without any hassle.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 Only Gossips. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-xs hover:underline underline-offset-4"
						href="#"
					>
						Terms of Service
					</Link>
					<Link
						className="text-xs hover:underline underline-offset-4"
						href="#"
					>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}

function GlobeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="2" x2="22" y1="12" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}

function InboxIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
			<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
		</svg>
	);
}

function MountainIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}

function SendIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m22 2-7 20-4-9-9-4Z" />
			<path d="M22 2 11 13" />
		</svg>
	);
}
