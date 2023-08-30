"use server"

import { PrismaClient } from "@prisma/client";
import { GossipsType } from "./getGossips";

const prisma = new PrismaClient();

export type SingleGossip = GossipsType;

export const getSingleGossip = async (id: string) => {
    try{
        return await prisma.post.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                backgroundEmoji: true,
                totalReactions: true,
                reactions: true,
                views: true,
                images: true,
            }
        });
    }
    catch(err){
        console.log(err);
    }
};
