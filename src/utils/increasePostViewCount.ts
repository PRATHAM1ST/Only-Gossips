import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ViewType = {
	postId: string;
	userId: string;
};

export async function increasePostViewCount({ postId, userId }: ViewType) {
	try {
		await prisma.view.create({
			data: {
				post: {
					connect: {
						id: postId,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return {
			success: true,
			message: "View count increased",
		};
	} catch (err: any) {
		return {
			success: false,
			message: err.message,
		};
	}
}
