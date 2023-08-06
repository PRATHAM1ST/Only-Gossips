import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const result = await prisma.post.findMany({});
    return NextResponse.json(result);
}