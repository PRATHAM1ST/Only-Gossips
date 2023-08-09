"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser() {
	return await prisma.user.create({
		select: {
			id: true,
		},
		data: {},
	});
}
