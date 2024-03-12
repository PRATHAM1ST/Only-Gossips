import Header from "@/components/Header";

export default async function Loading() {
	const bgColor = "bg-gray-300";
	return (
		<div className="container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<Header />
			<div className="animate-pulse">
				<div className="relative container grid gap-3 border-2 border-black dark:border-slate-500 rounded-2xl px-6 py-7 max-w-2xl mx-auto">
					<div className="flex-1 space-y-6 py-1">
						<div className={"h-12 rounded " + bgColor}></div>
						<div className={"h-3 w-20 rounded " + bgColor}></div>
						<div className={"h-60 rounded " + bgColor}></div>
						<div className="flex justify-between items-center">
							<div
								className={"h-7 w-14 rounded " + bgColor}
							></div>
							<div
								className={"h-7 w-40 rounded " + bgColor}
							></div>
							<div
								className={"h-8 w-8 rounded-full " + bgColor}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
