'use server'

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type RequestType = {
	userId: string;
	postId: string;
};

export async function removePostReaction({ userId, postId }: RequestType) {
	const userExists = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			reactions: true,
		},
	});

	if (!userExists) {
		return {
			success: false,
			message: "User not found",
		};
	}

	const currentPostReactions = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			reactions: true,
		},
	});

	const currentUserReactions = userExists;

	const newPostReactions = currentPostReactions?.reactions?.filter(
		(item: any) => item.userId !== userId
	);
	const newUserReactions = currentUserReactions.reactions?.filter(
		(item: any) => item.postId !== postId
	);

	if (!newPostReactions) {
		return {
			success: false,
			message: "No reactions found in post",
		};
	}

	if (!newUserReactions) {
		return {
			success: false,
			message: "No reactions found in user",
		};
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
				id: userId,
			},
			data: {
				reactions: [],
			},
		});
	} else {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				reactions: newUserReactions,
			},
		});
	}

	return {
		success: true,
		message: "Reaction removed",
	};
}
