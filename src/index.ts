import 'dotenv/config';
import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/libsql';

// Import route modules
import users from "./users";
import posts from "./post";
import comments from "./comments";

const app = new Hono();

// Initialize database connection
const db = drizzle(process.env.DB_FILE_NAME!);

// Health check
app.get("/", (c) => {
    return c.json({ 
        message: "Hono REST API",
        status: "running",
        endpoints: ["/users", "/posts", "/comments"]
    });
});

// Mount routes
app.route("/users", users);
app.route("/posts", posts);
app.route("/comments", comments);

export default app;