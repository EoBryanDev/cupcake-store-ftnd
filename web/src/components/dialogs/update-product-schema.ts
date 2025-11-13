import { z } from 'zod'

const updateProductSchema = z
  .object({
    productId: z.string().optional(),
    categoryId: z.string().min(1, 'Invalid Category'),
    name: z.string().min(2, 'Invalid Name'),
    slug: z
      .string()
      .min(2, 'Invalid Slug')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain lowercase, number and hifens (-) as separators',
      }),
    description: z.string().min(2, 'Invalid Description').max(255, 'Invalid Lenght'),
    unit: z.string().min(1, 'Invalid Unit'),

    active: z.boolean(),
  })

type TUpdateProductSchema = z.infer<typeof updateProductSchema>;

export type { TUpdateProductSchema };
export { updateProductSchema };