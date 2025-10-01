import { useState } from "react";
import { productSchema } from "../validation/product";
import { addProduct } from "../api/products";
import { ZodError } from "zod";
import { type ProductInput } from "../validation/product";
import type { ProductType, ProductVariant, UploadedImage } from "../types";

export function AddProductPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProductType>({
    categoryName: "",
    productName: "",
    description: "",
    imageAlt: "",
    variants: [
      {
        id: Date.now(),
        size: "",
        sku: "",
        price: "",
        sortOrder: 1,
        stockQuantity: 0,
      },
    ],
  });

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleInputChange = (field: keyof ProductType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVariantChange = (
    variantId: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      size: "",
      sku: "",
      price: "",
      sortOrder: formData.variants.length + 1,
      stockQuantity: 0,
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const removeVariant = (variantId: number) => {
    if (formData.variants.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.filter((variant) => variant.id !== variantId),
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      if (file.type.startsWith("image/") && uploadedImages.length < 2) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => [
              ...prev,
              {
                id: Date.now() + Math.random(),
                file: file,
                preview: e.target?.result as string,
                name: file.name,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId: number) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productInput: ProductInput = {
      categoryName:
        formData.categoryName === "clothing"
          ? "1"
          : formData.categoryName === "accessories"
          ? "2"
          : "",
      name: formData.productName,
      description: formData.description,
      imageAlt: formData.imageAlt,
      imageUrl1: uploadedImages[0]?.preview || "",
      imageUrl2: uploadedImages[1]?.preview,
      variants: formData.variants.map((v) => ({
        size: v.size,
        sku: v.sku,
        price: Number(v.price),
        stockQuantity: v.stockQuantity,
        sortOrder: v.sortOrder,
      })),
    };

    try {
      setErrors({});
      productSchema.parse(productInput);

      const product = await addProduct(productInput);
      console.log("Product created:", product);
      alert("Product successfully created!");
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const path = issue.path.join(".");
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to discard all changes?")) {
      console.log("Navigating back to product list...");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Add New Product
          </h1>
          <p className="text-gray-600 mt-2">
            To add a new product to myStore, fill in all fields and submit the
            form by clicking the pubslish button.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <legend className="text-xl font-semibold text-gray-900 mb-6">
              Category Information
            </legend>

            <fieldset className="fieldset">
              <label
                htmlFor="categoryName"
                className="fieldset-legend text-base text-gray-500"
              >
                Category Name
              </label>
              <select
                id="categoryName"
                name="categoryName"
                value={formData.categoryName}
                className="select mb-1"
                required
                onChange={(e) =>
                  handleInputChange("categoryName", e.target.value)
                }
              >
                <option value="" disabled={true}>
                  Select a category
                </option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
              </select>
              <p className="label text-sm text-error">
                {errors["categoryName"] && errors["categoryName"]}{" "}
              </p>
            </fieldset>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <legend className="text-xl font-semibold text-gray-900 mb-6">
              Product Information
            </legend>

            <fieldset className="fieldset space-y-4">
              <label
                htmlFor="productName"
                className="fieldset-legend text-base text-gray-500"
              >
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                className="input mb-1"
                placeholder="Enter product name"
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
                required
                minLength={2}
                maxLength={100}
              />
              <p className="label text-error text-sm">
                {errors["name"] && errors["name"]}
              </p>

              <label
                htmlFor="description"
                className="fieldset-legend text-base text-gray-500"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="textarea h-24 mb-0"
                placeholder="Describe the product..."
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
                maxLength={500}
              ></textarea>
              <p className="label mb-1">
                <span>{formData.description.length}/500 characters</span>
              </p>
              <p className="label text-sm text-error">
                {errors["description"] && errors["description"]}{" "}
              </p>

              <label
                htmlFor="imageAlt"
                className="fieldset-legend text-base text-gray-500"
              >
                Image Alt Text
              </label>
              <input
                id="imageAlt"
                name="imageAlt"
                type="text"
                className="input mb-1"
                placeholder="Describe the product image"
                onChange={(e) => handleInputChange("imageAlt", e.target.value)}
                required
                maxLength={150}
              />
              <p className="label text-sm text-error">
                {errors["imageAlt"] && errors["imageAlt"]}{" "}
              </p>
            </fieldset>
          </div>

          {/* Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <legend className="text-xl font-semibold text-gray-900 mb-6">
              Media
            </legend>

            <div className="space-y-6">
              <div className="form-control w-full mb-1">
                <label
                  htmlFor="imageUpload"
                  className="fieldset-legend text-base text-gray-500 mb-1"
                >
                  Product Images (Maximum 2)
                </label>

                {uploadedImages.length < 2 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                      id="imageUpload"
                      name="imageUpload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-12 mx-auto text-gray-400 mb-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg font-medium text-gray-900">
                        Upload Images
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Drag and drop or click to select
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 10MB each
                      </p>
                    </label>
                  </div>
                )}

                {/* Image Thumbnails */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={image.preview}
                            alt={`Preview ${image.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="label text-sm text-error">
                {errors["imageUrl1"] && errors["imageUrl1"]}
              </p>
            </div>
          </div>

          {/* Product Variants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <legend className="text-xl font-semibold text-gray-900">
                  Product Variants
                </legend>
                <p className="text-sm text-gray-600 mt-1">
                  Enter all sizes, even if out of stock
                </p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="btn btn-outline btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Size
              </button>
            </div>

            <div className="space-y-6">
              {formData.variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="border border-gray-200 rounded-lg p-4 lg:p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <legend className="font-bold text-gray-900">
                      Size Variant {index + 1}
                    </legend>
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(variant.id)}
                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="size"
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Size
                      </label>
                      <input
                        id="size"
                        name="size"
                        type="text"
                        className="input mb-1"
                        placeholder="S, M, L..."
                        value={variant.size}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.id,
                            "size",
                            e.target.value
                          )
                        }
                        maxLength={100}
                        required
                      />
                      <p className="label text-sm text-error">
                        {errors[`variants.${index}.size`] &&
                          errors[`variants.${index}.size`]}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="sku"
                        className="fieldset-legend text-base text-gray-500"
                      >
                        SKU
                      </label>
                      <input
                        id="sku"
                        name="sku"
                        type="text"
                        className="input mb-1"
                        placeholder="PROD-S-001"
                        value={variant.sku}
                        onChange={(e) =>
                          handleVariantChange(variant.id, "sku", e.target.value)
                        }
                        required
                      />
                      <p className="label text-sm text-error">
                        {errors[`variants.${index}.sku`] &&
                          errors[`variants.${index}.sku`]}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="price"
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Price (€ cents)
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        className="input mb-1"
                        placeholder="2500"
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.id,
                            "price",
                            e.target.value
                          )
                        }
                        required
                        min="0"
                        step="1"
                      />
                      <p className="label text-sm text-error">
                        {errors[`variants.${index}.price`] &&
                          errors[`variants.${index}.price`]}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="sortOrder"
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Sort Order
                      </label>
                      <input
                        id="sortOrder"
                        name="sortOrder"
                        type="number"
                        className="input mb-1"
                        placeholder="1"
                        value={variant.sortOrder}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.id,
                            "sortOrder",
                            parseInt(e.target.value) || 0
                          )
                        }
                        required
                        min="1"
                      />
                      <p className="label text-sm text-error">
                        {errors[`variants.${index}.sortOrder`] &&
                          errors[`variants.${index}.sortOrder`]}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="stockQuantity"
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Stock Quantity
                      </label>
                      <input
                        id="stockQuantity"
                        name="stockQuantity"
                        type="number"
                        className="input mb-1"
                        placeholder="0"
                        value={variant.stockQuantity}
                        onChange={(e) =>
                          handleVariantChange(
                            variant.id,
                            "stockQuantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        required
                        min="0"
                      />
                      <p className="label text-sm text-error">
                        {errors[`variants.${index}.stockQuantity`] &&
                          errors[`variants.${index}.stockQuantity`]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-ghost lg:btn-wide rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-neutral lg:btn-wide rounded-full disabled:btn-disabled font-normal hover:opacity-60"
              >
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
