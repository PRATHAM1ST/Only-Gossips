"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type userDataType = {
	email: string;
	name: string;
};

export async function createUser({ email, name }: userDataType) {
	return await prisma.user.create({
		select: {
			id: true,
		},
		data: {
			email,
			name,
		},
	});
}
