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

		const reactionExists = await prisma.reaction.findUnique({
			where: {
				id: reaction.reactionId,
			},
		});

        const currentReactions = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                reactions: true,
            },
        });

        const frame  = {
            reactionId: reaction.reactionId,
            userId: reaction.userId,
            emojie: reactionExists?.emojie,
        }

        if (currentReactions?.reactions?.some((item : any) => item.userId === frame.userId)){
            return NextResponse.json({
                success: false,
                message: "Reaction already exists",
            });
        }

        await prisma.user.update({
            where: {
                id: reaction.userId,
            },
            data: {
                reactions: {
                    push: {
                        reactionId: reaction.reactionId,
                        postId: postId,
                        emojie: reactionExists?.emojie,
                    }
                }
            }
        });

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				totalReactions: {
					increment: 1,
				},
				reactions: {
					push: {
						...frame
					},
				},
			},
		});

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

        const currentUserReactions = await prisma.user.findUnique({
            where: {
                id: reaction.userId,
            },
            select: {
                reactions: true,
            },
        });

        if (!currentPostReactions?.reactions.length && !currentUserReactions?.reactions.length){
            return NextResponse.json({
                success: false,
                message: "No reactions found",
            });
        }

        const newPostReactions  = currentPostReactions?.reactions?.filter((item : any) => item.userId !== reaction.userId);
        const newUserReactions = currentUserReactions?.reactions?.filter((item : any) => item.postId !== postId);

        if (!newPostReactions){
            return NextResponse.json({
                success: false,
                message: "No reactions found in post",
            });
        }

        if (!newUserReactions){
            return NextResponse.json({
                success: false,
                message: "No reactions found in user",
            });
        }

        if (newPostReactions?.length === 0){
            await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    totalReactions: 0,
                    reactions: []
                }
            });
        }
        else{
            await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    totalReactions: {
                        decrement: 1,
                    },
                    reactions: newPostReactions as Prisma.InputJsonObject[],
                }
            });
        }

        if (newUserReactions?.length === 0){
            await prisma.user.update({
                where: {
                    id: reaction.userId,
                },
                data: {
                    reactions: []
                }
            });
        }
        else{
            await prisma.user.update({
                where: {
                    id: reaction.userId,
                },
                data: {
                    reactions: newUserReactions as Prisma.InputJsonObject[],
                }
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
