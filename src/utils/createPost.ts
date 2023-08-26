"use server";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type RequestType = {
	title: string;
	content: string;
	backgroundEmoji: string;
	userId: string;
	images: Prisma.InputJsonValue[];
};

export async function createPost({
	title,
	content,
	backgroundEmoji,
	userId,
	images,
}: RequestType) {
	const result = await prisma.post.create({
		data: {
			title: title,
			content: content,
			backgroundEmoji: backgroundEmoji,
			images: images,
			author: {
				connect: {
					id: userId,
				},
			},
		},
	});

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			posts: {
				connect: {
					id: result.id,
				},
			},
		},
	});

	return {
        sucess: true,
        message: "Post created successfully"
    };
}
