import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
	const result = await prisma.reaction.findMany();
	return NextResponse.json(result);
}


// POST /api/reactions
// Required fields in body: emojie

export async function POST(
	req: Request
) {
	const { emojie } = await req.json();
	const result = await prisma.reaction.create({
		data: {
			emojie: emojie,
		},
	});

	return NextResponse.json(result);
}
