import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const result = await prisma.user.findMany();
	return NextResponse.json(result);
}

export async function PATCH(req: Request) {
	const { id } = await req.json();
	const result = await prisma.user.update({
		where: {
			id: id,
		},
		data: {
            accessedAt: new Date(),
        },
	});
	return NextResponse.json(result);
}
