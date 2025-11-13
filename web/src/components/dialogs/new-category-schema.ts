import { z } from 'zod'

const newCategorySchema = z
  .object({
    name: z.string().min(2, 'Invalid Name'),
    slug: z
      .string()
      .min(2, 'Invalid Slug')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain lowercase, number and hifens (-) as separators',
      }),
    description: z.string().min(2, 'Invalid Description').max(255, 'Invalid Lenght'),
  })

type TNewCategorySchema = z.infer<typeof newCategorySchema>;

export type { TNewCategorySchema };
export { newCategorySchema };