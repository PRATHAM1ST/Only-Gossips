"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserExists(id: string) {
	try {
		await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		return true;
	} catch (e) {
		return false;
	}
}
