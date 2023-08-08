"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type GossipsType = {
	id: string;
	title: string;
	content: string;
	backgroundEmoji: string;
	views: number;
	totalReactions: number;
	reactions?: any[];
};

export async function getGossips() {
	return await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			content: true,
			backgroundEmoji: true,
			views: true,
			totalReactions: true,
			reactions: true,
		},
	});
}
