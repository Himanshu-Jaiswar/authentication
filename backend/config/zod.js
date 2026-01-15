import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password length must be at least 8 characters")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password length must be at least 8 characters")
});