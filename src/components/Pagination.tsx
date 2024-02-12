import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Pagination({
	currentPage,
	totalPagesCount,
}: {
	currentPage: number;
	totalPagesCount: number;
}) {
	const style =
		"border-2 border-black dark:border-white px-2 py-1 rounded flex justify-center items-center text-xs font-bold user-select-none cursor-pointer w-fit";
	const activeStyle =
		"bg-black dark:bg-white text-white dark:text-black rounded ease-in-out duration-300";

	const HandlePrevieousButton = () => {
		if (currentPage <= 1) return <></>;
		return (
			<Button
				variant={"outline"}
				size={"lg"}
				className="p-0 fixed top-1/2 left-4 transform -translate-y-1/2 rounded-full aspect-square"
			>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link href={`/page/${currentPage - 1}`}>
								<ArrowLeft className="flex justify-center items-center z-50  aspect-square" />
							</Link>
						</TooltipTrigger>
						<TooltipContent sideOffset={20} side="right">
							<p>Previous Page</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</Button>
		);
	};

	const HandleNextButton = () => {
		if (currentPage >= totalPagesCount) return <></>;
		return (
			<Button
				variant={"outline"}
				size={"lg"}
				className="p-0 fixed top-1/2 right-4 transform -translate-y-1/2 rounded-full aspect-square"
			>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link href={`/page/${Number(currentPage) + 1}`}>
								<ArrowRight className="flex justify-center items-center z-50  aspect-square" />
							</Link>
						</TooltipTrigger>
						<TooltipContent sideOffset={20} side="left">
							<p>Next Page</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</Button>
		);
	};

	return (
		<>
			<HandlePrevieousButton />
			<HandleNextButton />
			<footer className="flex gap-1 justify-center items-center mt-8">
				<a
					className={style}
					data-disabled={currentPage == 1}
					href={`/page/${currentPage - 1}`}
				>
					Previous
				</a>
				{Array(totalPagesCount)
					.fill(0)
					.map((_, idx) =>
						currentPage == idx + 1 ? (
							<div
								key={idx}
								className={`${style} ${activeStyle}`}
							>
								{idx + 1}
							</div>
						) : (
							<a
								key={idx}
								className={style}
								href={`/page/${idx + 1}`}
							>
								{idx + 1}
							</a>
						)
					)}
				<a
					className={style}
					data-disabled={currentPage == totalPagesCount}
					href={`/page/${Number(currentPage) + 1}`}
				>
					Next
				</a>
			</footer>
		</>
	);
}
