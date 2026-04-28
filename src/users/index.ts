import { Hono } from "hono";
import {
    getUsers,
    getUserById,
    createUser,
    getUserByEmail
} from "./service";
import { getPostsByUserId } from "../post/service";

const users = new Hono();

users.get("/", async (c) => {
    const allUsers = await getUsers();
    return c.json(allUsers);
});

users.get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ error: "Invalid user ID" }, 400);
    }
    const user = await getUserById(id);
    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }
    return c.json(user);
});

users.post("/", async (c) => {
    const body = await c.req.json();
    
    if (!body.name || !body.age || !body.email || !body.password) {
        return c.json({ error: "Missing required fields: name, age, email, password" }, 400);
    }
    
    const exists = await getUserByEmail(body.email);
    if (exists) {
        return c.json({ error: "User already exists" }, 409);
    }
    
    const newUser = await createUser({
        name: body.name,
        age: body.age,
        email: body.email,
        password: body.password,
        phone: body.phone
    });
    
    const { password, ...userWithoutPassword } = newUser;
    return c.json(userWithoutPassword, 201);
});

users.get("/:id/posts", async (c) => {
    const userId = Number(c.req.param("id"));
    if (isNaN(userId)) {
        return c.json({ error: "Invalid user ID" }, 400);
    }
    const posts = await getPostsByUserId(userId);
    return c.json(posts);
});

export default users;
