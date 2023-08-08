"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function FetchReactions() {
	return prisma.reaction.findMany({
        select: {
            id: true,
            emojie: true,
        }
    });
}
