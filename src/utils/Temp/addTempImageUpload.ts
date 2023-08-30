"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTempImageUpload = async (file: any) => {
	return await prisma.temp.create({
		data: {
			imageData: file
		},
	});
};
