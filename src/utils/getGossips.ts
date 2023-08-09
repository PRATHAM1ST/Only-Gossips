"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type GossipsType = {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	backgroundEmoji: string;
	views: number;
	totalReactions: number;
	reactions?: any[];
};

export async function getGossips({ pageNumber }: { pageNumber: number }) {
	if (pageNumber < 1) {
		return [];
	}

	const take = 2;
	const skip = (pageNumber - 1) * take;
	return await prisma.post.findMany({
		skip: skip,
		take: take,
		select: {
			id: true,
			title: true,
			content: true,
			createdAt: true,
			backgroundEmoji: true,
			views: true,
			totalReactions: true,
			reactions: true,
		},
		orderBy:{
			createdAt: "desc"
		}
	});
}
