import {z} from "zod"

export const UserFormValidation  = z.object({
    name: z.string()
    .min(2, "Name must be at least 3 characters.")
    .max(40, "Name must be at most 40 characters."),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid Phone number')
    })