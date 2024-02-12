"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserExists(email: string) {
	try {
		const data = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		return data?.id as string;
	} catch (e) {
		return false;
	}
}
