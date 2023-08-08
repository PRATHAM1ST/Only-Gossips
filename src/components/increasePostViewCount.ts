import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function increasePostViewCount(ids: string[]) {
	await prisma.post.updateMany({
		where: {
			id: {
				in: ids,
			},
		},
		data: {
			views: {
				increment: 1,
			},
		},
	});
}
