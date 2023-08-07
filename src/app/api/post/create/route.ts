import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Request = { json: () => Promise<{ title: string, content: string, backgroundEmoji: string, userId: string }> };

export async function POST(req: Request) {
    const { title, content, backgroundEmoji, userId } = await req.json();
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            backgroundEmoji: backgroundEmoji,
            author: {
                connect: {
                    id: userId,
                }
            },
        }
    });

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            posts: {
                connect: {
                    id: result.id
                }
            }
        }
    })
    return NextResponse.json(result);
}