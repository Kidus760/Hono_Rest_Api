# Hono REST API

A modular REST API built with Hono, Drizzle ORM, and SQLite.

## Quick Start


### 1. Install dependencies

```bash
bun install
```

### 2. Set up the database

Create a `.env` file in the project root:

```bash
echo "DB_FILE_NAME=file:local.db" > .env
```

> **Important:** The `file:` prefix is required. `local.db` alone will not work.

### 3. Push the database schema

This creates the SQLite tables:

```bash
bun run db:push
```

### 4. Start the server

```bash
bun run dev
```

The API is now running at `http://localhost:3000`

---

## Test the API

### Using HTTPie

**Create a user:**
```bash
http POST localhost:3000/users name="Abebe" age:=25 email="abebe@gmail.com" password="abebe123" phone="0911111111"
```

**Create a post** (use the user ID from above, usually `1`):
```bash
http POST localhost:3000/posts title="Hello World" content="My first post" userId:=1
```

**Create a comment** (use the post ID from above, usually `1`):
```bash
http POST localhost:3000/comments content="Nice post!" postId:=1
```

**Get all users:**
```bash
http GET localhost:3000/users
```

**Get all posts:**
```bash
http GET localhost:3000/posts
```

**Get all comments:**
```bash
http GET localhost:3000/comments
```

**Get posts by user:**
```bash
http GET localhost:3000/users/1/posts
```

**Get comments by post:**
```bash
http GET localhost:3000/posts/1/comments
```

### Using curl

```bash
# Create user
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Abebe","age":25,"email":"abebe@gmail.com","password":"abebe123","phone":"0911111111"}'

# Create post
curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d '{"title":"Hello","content":"World","userId":1}'

# Create comment
curl -X POST http://localhost:3000/comments -H "Content-Type: application/json" -d '{"content":"Great!","postId":1}'

# Get all
curl http://localhost:3000/users
curl http://localhost:3000/posts
curl http://localhost:3000/comments
```
