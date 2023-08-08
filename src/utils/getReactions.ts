"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ReactionsType = {
    id: string;
    emojie: string;
};

export async function getReactions() {
	return prisma.reaction.findMany({
        select: {
            id: true,
            emojie: true,
        }
    });
}
