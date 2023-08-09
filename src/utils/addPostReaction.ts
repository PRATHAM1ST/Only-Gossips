"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type RequestType = {
	userId: string;
	postId: string;
	reactionId: string;
};

export async function addPostReaction({
	userId,
	postId,
	reactionId,
}: RequestType) {
    const userExists = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!userExists) {
		return {
			success: false,
			message: "User not found",
		};
	}

	const reactionExists = await prisma.reaction.findUnique({
		where: {
			id: reactionId,
		},
	});

	if (!reactionExists) {
		return {
			success: false,
			message: "Reaction not found",
		};
	}

	const reactionExistsInPost = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			reactions: true,
		},
	});

	if (
		reactionExistsInPost?.reactions.some(
			(reaction: any) => reaction?.userId === userId
		)
	) {
		return {
			success: false,
			message: "Reaction already exists",
		};
	}

	const updatePostReaction = prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			totalReactions: {
				increment: 1,
			},
			reactions: {
				push: {
					reactionId: reactionId,
					userId: userId,
					emojie: reactionExists.emojie,
				},
			},
		},
	});

	const updateUserReaction = prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			reactions: {
				push: {
					reactionId: reactionId,
					postId: postId,
					emojie: reactionExists.emojie,
				},
			},
		},
	});

	await Promise.all([updatePostReaction, updateUserReaction]);

	return {
		success: true,
		message: "Reaction added successfully",
		emojie: reactionExists.emojie,
        reactionId: reactionId,
	};
}
