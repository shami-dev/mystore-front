import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be under 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be under 500 characters" }),
  imageAlt: z.string().min(1, { message: "Image alt is required" }).max(150, {
    message: "Image alternative text must be under 150 characters",
  }),
  imageUrl1: z.url(),
  imageUrl2: z.union([z.url(), z.literal("")]).optional(),
  categoryId: z.number().min(1, { message: "Category name is required" }),
  variants: z.array(
    z.object({
      size: z
        .string()
        .min(1, { message: "Size is required" })
        .max(100, { message: "Size must be under 100 characters" }),
      sku: z
        .string()
        .min(1, { message: "SKU is required" })
        .max(100, { message: "SKU must be under 100 characters" }),
      price: z
        .number()
        .positive()
        .refine((val) => !!val, { error: "Price is required" }),
      stockQuantity: z
        .number()
        .int()
        .nonnegative()
        .refine((val) => val >= 0, {
          error: "Stock quantity must be >=0",
        }),
      sortOrder: z
        .number()
        .int()
        .nonnegative()
        .refine((val) => val > 0, { error: "Sort order must be >0" }),
    })
  ),
});

export type ProductInput = z.infer<typeof productSchema>;
