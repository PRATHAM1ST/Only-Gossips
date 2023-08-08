import { Oooh_Baby } from "next/font/google";
import Link from "next/link";

const oooh_baby = Oooh_Baby({
	subsets: ["latin"],
	weight: "400",
});

export default function Header({ removeAdder = false }) {
	return (
		<header className="flex justify-between items-center my-5">
			<Link href="/" className={oooh_baby.className + " text-3xl"}>
				Goosip
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
