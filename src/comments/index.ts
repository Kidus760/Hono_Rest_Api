import { Hono } from "hono";
import {
    getAllComments,
    getCommentById,
    createComment
} from "./service";

const comments = new Hono();

comments.get("/", async (c) => {
    const allComments = await getAllComments();
    return c.json(allComments);
});

comments.get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ error: "Invalid comment ID" }, 400);
    }
    const comment = await getCommentById(id);
    if (!comment) {
        return c.json({ error: "Comment not found" }, 404);
    }
    return c.json(comment);
});

comments.post("/", async (c) => {
    const body = await c.req.json();
    
    if (!body.content || !body.postId) {
        return c.json({ error: "Missing required fields: content, postId" }, 400);
    }
    
    try {
        const newComment = await createComment({
            content: body.content,
            postId: Number(body.postId)
        });
        return c.json(newComment, 201);
    } catch (error: any) {
        if (error.message === "Post not found") {
            return c.json({ error: "Post not found" }, 404);
        }
        return c.json({ error: "Failed to create comment" }, 500);
    }
});

export default comments;