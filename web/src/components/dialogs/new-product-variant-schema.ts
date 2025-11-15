import { z } from 'zod'

const newProductVariantSchema = z
  .object({
    productId: z.string(),
    name: z.string(),
    slug: z
      .string()
      .min(2, 'Invalid Slug')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain lowercase, number and hifens (-) as separators',
      }),
    description: z.string().optional(),
    color: z.string().optional(),
    weight: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    size: z.string().optional(),
    priceInCents: z.number(),
    rawMaterial: z.string().optional(),
    imageUrl: z.string(),
    active: z.boolean(),
  })

type TNewProductVariantSchema = z.infer<typeof newProductVariantSchema>;

export type { TNewProductVariantSchema };
export { newProductVariantSchema };