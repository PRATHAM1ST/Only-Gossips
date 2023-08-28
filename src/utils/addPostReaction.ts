"use server";

import { PrismaClient, Prisma } from "@prisma/client";

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
	const getReaction = await prisma.reaction.update({
		where: {
			id: reactionId,
		},
		data:{
			totalUsed:{
				increment : 1
			}
		},
		select: {
			emojie: true,
		},
	});

	if (!getReaction) {
		return {
			success: false,
			message: "Reaction not found",
		};
	}

	const userReactions = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			reactions: true,
		},
	});

	if (!userReactions) {
		return {
			success: false,
			message: "User not found",
		};
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
		return {
			success: false,
			message: "Post not found",
		};
	}

	const userReactionsUpdate = prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			reactions: [
				...userReactions.reactions.filter(
					(reac) => reac.postId !== postId
				),
				{
					postId: postId,
					reactionId: reactionId,
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
			totalReactions:{
				increment : 1
			},
			reactions: [
				...postReactions.reactions.filter(
					(reac) => reac.userId !== userId
				),
				{
					userId: userId,
					reactionId: reactionId,
					emojie: getReaction.emojie,
				},
			],
		},
	});

	const [userReactionsUpdated, postReactionsUpdated] = await Promise.all([
		userReactionsUpdate,
		postReactionsUpdate,
	]);

	return {
		success: true,
		message: "Reaction added successfully",
		emojie: getReaction.emojie,
		reactionId: reactionId,
		updatedPostReactions: postReactionsUpdated.reactions,
	};
}
