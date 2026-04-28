import { db } from "../db";
import { usersTable } from "../schema";
import { eq } from "drizzle-orm";



export const getUsers = async () => {
    return await db
        .select({
            id: usersTable.id,
            name: usersTable.name,
            age: usersTable.age,
            email: usersTable.email,
            phone: usersTable.phone,
        })
        .from(usersTable);
};

export const getUserById = async (id: number) => {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));
    return result[0] || null;
};

export const getUserByEmail = async (email: string) => {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
    return result[0] || null;
};

export const createUser = async (data: {
    name: string;
    age: number;
    email: string;
    password: string;
    phone?: string;
}) => {
    const result = await db
        .insert(usersTable)
        .values(data)
        .returning();
    return result[0];
};