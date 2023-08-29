"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const removeTempImageUpload = async (id: string) => {
	return await prisma.temp.delete({
		where: {
			id: id,
		},
	});
};
