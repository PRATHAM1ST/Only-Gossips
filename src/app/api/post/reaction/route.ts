import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const postId = url.searchParams.get("postId");

		if (!postId) {
			return NextResponse.json({
				success: false,
				message: "Provide a post id",
			});
		}

		const result = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!result) {
			return NextResponse.json({
				success: false,
				message: "Post not found",
			});
		}
		return NextResponse.json({
			reactions: result.reactions,
		});
	} catch (e) {
		return NextResponse.json({
			success: false,
			message: "Post not found",
		});
	}
}

export async function PATCH(req: Request) {
	try {
		const { reaction } = await req.json();
		const url = new URL(req.url);
		const postId = url.searchParams.get("postId");

		if (!postId) {
			return NextResponse.json({
				success: false,
				message: "Provide a post id",
			});
		}

		const getReaction = await prisma.reaction.findUnique({
			where: {
				id: reaction.reactionId,
			},
			select: {
				emojie: true,
			},
		});

		if (!getReaction) {
			return NextResponse.json({
				success: false,
				message: "Reaction not found",
			});
		}

		const userReactions = await prisma.user.findUnique({
			where: {
				id: reaction.userId,
			},
			select: {
				reactions: true,
			},
		});

		if (!userReactions) {
			return NextResponse.json({
				success: false,
				message: "User not found",
			});
		}

		const postReactions = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			select: {
				reactions: true,
			},
		});

		if (!postReactions) {
			return NextResponse.json({
				success: false,
				message: "Post not found",
			});
		}

		const userReactionsUpdate = prisma.user.update({
			where: {
				id: reaction.userId,
			},
			data: {
				reactions: [
					...userReactions.reactions.filter(
						(reac) => reac.postId !== postId
					),
					{
						postId: postId,
						reactionId: reaction.reactionId,
						emojie: getReaction.emojie,
					},
				],
			},
		});

		const postReactionsUpdate = prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				reactions: [
					...postReactions.reactions.filter(
						(reac) => reac.userId !== reaction.userId
					),
					{
						userId: reaction.userId,
						reactionId: reaction.reactionId,
						emojie: getReaction.emojie,
					},
				],
			},
		});

		const [userReactionsUpdated, postReactionsUpdated] = await Promise.all([
			userReactionsUpdate,
			postReactionsUpdate,
		]);

		return NextResponse.json({
			success: true,
			message: "Reaction added",
		});
	} catch (e) {
		return NextResponse.json({
			success: false,
			message: "Error Occured",
			error: e,
		});
	}
}

export async function DELETE(req: Request) {
	try {
		const { reaction } = await req.json();
		const url = new URL(req.url);
		const postId = url.searchParams.get("postId");

		if (!postId) {
			return NextResponse.json({
				success: false,
				message: "Provide a post id",
			});
		}

		const currentPostReactions = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			select: {
				reactions: true,
			},
		});

        if(!currentPostReactions?.reactions.some((item: any) => item.userId === reaction.userId)){
            return NextResponse.json({
                success: false,
                message: "Reaction not found in post",
            });
        }

		const currentUserReactions = await prisma.user.findUnique({
			where: {
				id: reaction.userId,
			},
			select: {
				reactions: true,
			},
		});

        if(!currentUserReactions?.reactions.some((item: any) => item.postId === postId)){
            return NextResponse.json({
                success: false,
                message: "Reaction not found in user",
            });
        }

		const newPostReactions = currentPostReactions?.reactions?.filter(
			(item: any) => item.userId !== reaction.userId
		);
		const newUserReactions = currentUserReactions?.reactions?.filter(
			(item: any) => item.postId !== postId
		);

		if (!newPostReactions) {
			return NextResponse.json({
				success: false,
				message: "No reactions found in post",
			});
		}

		if (!newUserReactions) {
			return NextResponse.json({
				success: false,
				message: "No reactions found in user",
			});
		}

		if (newPostReactions?.length === 0) {
			await prisma.post.update({
				where: {
					id: postId,
				},
				data: {
					totalReactions: 0,
					reactions: [],
				},
			});
		} else {
			await prisma.post.update({
				where: {
					id: postId,
				},
				data: {
					totalReactions: {
						decrement: 1,
					},
					reactions: newPostReactions,
				},
			});
		}

		if (newUserReactions?.length === 0) {
			await prisma.user.update({
				where: {
					id: reaction.userId,
				},
				data: {
					reactions: [],
				},
			});
		} else {
			await prisma.user.update({
				where: {
					id: reaction.userId,
				},
				data: {
					reactions: newUserReactions,
				},
			});
		}

		return NextResponse.json({
			success: true,
			message: "Reaction deleted",
		});
	} catch (e) {
		return NextResponse.json({
			success: false,
			message: "Error Occured",
			error: e,
		});
	}
}
