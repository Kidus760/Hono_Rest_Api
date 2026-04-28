import { db } from "../db";
import { postsTable } from "../schema";
import { eq } from "drizzle-orm";
import { getUserById } from "../users/service";


export const getAllPosts = async () => {
    return await db.select().from(postsTable);
};

export const getPostById = async (id: number) => {
    const result = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, id));
    return result[0] || null;
};

export const getPostsByUserId = async (userId: number) => {
    return await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.userId, userId));
};

export const createPost = async (data: {
    title: string;
    content: string;
    userId: number;
}) => {
    const user = await getUserById(data.userId);
    if (!user) {
        throw new Error("User not found");
    }

    const result = await db
        .insert(postsTable)
        .values(data)
        .returning();
    return result[0];
};