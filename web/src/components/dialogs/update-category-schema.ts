import { z } from 'zod'

const updateCategorySchema = z
  .object({
    categoryId: z.string().optional(),
    name: z.string().optional(),
    slug: z
      .string()
      .min(2, 'Invalid Slug')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain lowercase, number and hifens (-) as separators',
      }).optional(),
    description: z.string().optional(),
  })

type TUpdateCategorySchema = z.infer<typeof updateCategorySchema>;

export type { TUpdateCategorySchema };
export { updateCategorySchema };