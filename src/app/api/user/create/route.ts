import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
    const result = await prisma.user.create({
        data: {}
    });
    return NextResponse.json(result);
}