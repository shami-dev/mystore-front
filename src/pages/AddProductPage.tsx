import { useState } from "react";
import { productSchema } from "../validation/product";
import { addProduct } from "../api/products";
import { ZodError } from "zod";
import { type ProductInput } from "../validation/product";
import type { ProductType, ProductVariant, UploadedImage } from "../types";
import { useNavigate } from "react-router-dom";

export function AddProductPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProductType>({
    categoryId: "",
    name: "",
    description: "",
    imageAlt: "",
    variants: [
      {
        id: Date.now(),
        size: "",
        sku: "",
        price: "",
        sortOrder: 1,
        stockQuantity: "",
      },
    ],
  });

  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

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
      stockQuantity: "",
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const previewUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        setUploadedImage({
          id: Date.now(),
          file,
          preview: previewUrl,
          url: data.secure_url,
          name: file.name,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Try again.");
    }
  };

  const removeImage = () => setUploadedImage(null);

  type SubmitAction = "publish" | "publishAndAdd";

  const [submitAction, setSubmitAction] = useState<SubmitAction>("publish");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const action = submitAction;

    if (!uploadedImage) {
      setErrors({ imageUrl1: "Product image is required." });
      return;
    }

    const productInput: ProductInput = {
      categoryId: Number(formData.categoryId),
      name: formData.name,
      description: formData.description,
      imageAlt: formData.imageAlt,
      imageUrl1: uploadedImage.url!,
      variants: formData.variants.map((v) => ({
        size: v.size,
        sku: v.sku,
        price: Number(v.price),
        stockQuantity: Number(v.stockQuantity),
        sortOrder: v.sortOrder,
      })),
    };

    try {
      setErrors({});
      productSchema.parse(productInput);

      await addProduct(productInput);

      if (action === "publish") {
        navigate("/products");
      } else if (action === "publishAndAdd") {
        setShowToast(true);

        setFormData({
          categoryId: "",
          name: "",
          description: "",
          imageAlt: "",
          variants: [
            {
              id: Date.now(),
              size: "",
              sku: "",
              price: "",
              sortOrder: 1,
              stockQuantity: "",
            },
          ],
        });

        setUploadedImage(null);

        setTimeout(() => setShowToast(false), 5000);
      }
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
      navigate("/products");
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
                htmlFor="categoryId"
                className="fieldset-legend text-base text-gray-500"
              >
                Category Name
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                className="select mb-1"
                required
                onChange={(e) =>
                  handleInputChange("categoryId", e.target.value)
                }
              >
                <option value="" disabled={true}>
                  Select a category
                </option>
                <option value="1">Apparel</option>
                <option value="2">Accessories</option>
              </select>
              <p className="label text-sm text-error">
                {errors["categoryId"] && errors["categoryId"]}{" "}
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
                htmlFor="name"
                className="fieldset-legend text-base text-gray-500"
              >
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                type="text"
                className="input mb-1"
                placeholder="Enter product name"
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                value={formData.description}
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
                value={formData.imageAlt}
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
                  Product Image
                </label>

                {/* Image Thumbnails */}
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                      id="imageUpload"
                      name="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <p className="text-lg font-medium text-gray-900">
                        Upload Image
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Drag and drop or click to select
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG/JPG/WEBP — 480x480 px
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative w-48 h-48 mt-4">
                    <img
                      src={uploadedImage.preview}
                      alt={`Preview ${uploadedImage.name}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
                    >
                      ✕
                    </button>
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
                        htmlFor={`size-${index}`}
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Size
                      </label>
                      <input
                        id={`size-${index}`}
                        name={`size-${index}`}
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
                        htmlFor={`sku-${index}`}
                        className="fieldset-legend text-base text-gray-500"
                      >
                        SKU
                      </label>
                      <input
                        id={`sku-${index}`}
                        name={`sku-${index}`}
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
                        htmlFor={`price-${index}`}
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Price (€ cents)
                      </label>
                      <input
                        id={`price-${index}`}
                        name={`price-${index}`}
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
                        htmlFor={`sortOrder-${index}`}
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Sort Order
                      </label>
                      <input
                        id={`sortOrder-${index}`}
                        name={`sortOrder-${index}`}
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
                        htmlFor={`stockQuantity-${index}`}
                        className="fieldset-legend text-base text-gray-500"
                      >
                        Stock Quantity
                      </label>
                      <input
                        id={`stockQuantity-${index}`}
                        name={`stockQuantity-${index}`}
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

              {/* Publish normally */}
              <button
                type="submit"
                className="btn btn-neutral lg:btn-wide rounded-full disabled:btn-disabled font-normal hover:opacity-60"
                onClick={() => setSubmitAction("publish")}
              >
                Publish Product
              </button>

              {/* Publish & Add Another */}
              <button
                type="submit"
                className="btn lg:btn-wide rounded-full font-normal"
                onClick={() => setSubmitAction("publishAndAdd")}
              >
                Publish & Add Another
              </button>
            </div>
          </div>

          {/* Toast */}
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Product published successfully!</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
