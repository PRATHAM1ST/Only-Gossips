"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type RequestType = {
	userId: string;
	postId: string;
};

export async function checkUserPostReaction({ userId, postId }: RequestType) {
	const reactionExistsInPost = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			reactions: true,
		},
	});

	const reaction: any = reactionExistsInPost?.reactions?.find(
		(item: any) => item.postId === postId
	);

	if (reaction) {
		return {
			success: true,
			message: "Reaction already exists",
			reactionId: reaction.reactionId,
            emojie: reaction.emojie,
		};
	}

	return {
		success: false,
		message: "Reaction not found",
	};
}
