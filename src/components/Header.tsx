import Link from "next/link";
import { gotham, margurite } from "@/app/fonts";
import { Button } from "./ui/button";

export default function Header({ removeAdder = false }) {
	return (
		<header className="flex justify-between items-center my-5">
			<Link href="/" className={"text-3xl"}>
				<span className={gotham.className}>Only</span>
				<span className={margurite.className + " text-sky-500"}>
					Gossips
				</span>
			</Link>
			{removeAdder ? (
				<div onClick={() => window.history.back()}>
					<Button variant={"destructive"}>Cancel</Button>
				</div>
			) : (
				<Link href="/new">
					<Button>Add Gossip</Button>
				</Link>
			)}
		</header>
	);
}
