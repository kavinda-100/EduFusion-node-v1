import z from 'zod';

export const zodAdminSchema = z.object({
    user_id: z.string({message: "User id is required"}),
});

export type zodAdminSchemaType = z.infer<typeof zodAdminSchema>;