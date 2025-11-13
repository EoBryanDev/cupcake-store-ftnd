import { z } from 'zod'

const updateProductSchema = z
  .object({
    productId: z.string().optional(),
    categoryId: z.string().optional(),
    name: z.string().optional(),
    slug: z
      .string()
      .min(2, 'Invalid Slug')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain lowercase, number and hifens (-) as separators',
      }).optional(),
    description: z.string().optional(),
    unit: z.string().optional(),

    active: z.boolean(),
  })

type TUpdateProductSchema = z.infer<typeof updateProductSchema>;

export type { TUpdateProductSchema };
export { updateProductSchema };