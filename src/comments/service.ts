import { db } from "../db";
import { commentsTable } from "../schema";
import { eq } from "drizzle-orm";
import { getPostById } from "../post/service";


export const getAllComments = async () => {
    return await db.select().from(commentsTable);
};

export const getCommentById = async (id: number) => {
    const result = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.id, id));
    return result[0] || null;
};

export const getCommentsByPostId = async (postId: number) => {
    return await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.postId, postId));
};

export const createComment = async (data: {
    content: string;
    postId: number;
}) => {
    const post = await getPostById(data.postId);
    if (!post) {
        throw new Error("Post not found");
    }

    const result = await db
        .insert(commentsTable)
        .values(data)
        .returning();
    return result[0];
};