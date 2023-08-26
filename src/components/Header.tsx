import Link from "next/link";
import { gotham, margurite } from "@/app/fonts";

export default function Header({ removeAdder = false }) {
	return (
		<header className="flex justify-between items-center my-5">
			<Link href="/" className={"text-3xl"}>
				<span className={gotham.className}>
					Only
				</span>
				<span className={margurite.className + " text-sky-500"}>
					Gossip
				</span>
			</Link>
			{!removeAdder && (
				<Link
					href="/new"
					className="bg-black text-white rounded-md px-2 text-xs font-bold h-fit py-1 hover:bg-slate-900"
				>
					+Add Gossip
				</Link>
			)}
		</header>
	);
}
