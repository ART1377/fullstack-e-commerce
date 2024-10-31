"use client";

import React, { useState } from "react";
import DashedContainer from "@/app/components/dashed-container/dashed-container";
import Input from "@/app/components/form/input/input";
import Dropdown from "@/app/components/dropdown/dropdown";
import SortIcon from "@/app/icons/sort-icon";
import { categoryItems } from "@/app/components/homepage/category/category";
import { sizes } from "@/app/data/data";
import ColorItem from "@/app/components/color-item/color-item";
import { Feature, Stock } from "../../../../../../next-type-d";
import SizeItem from "@/app/components/size-item/size-item";
import UploadIcon from "@/app/icons/upload-icon";
import TextArea from "@/app/components/form/text-area/text-area";
import Button from "@/app/components/button/button";
import PlusIcon from "@/app/icons/plus-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import CloseIcon from "@/app/icons/close-icon";
import * as actions from "@/app/actions/product-actions/product-action";
import { z } from "zod";
import Checkbox from "@/app/components/form/checkbox/checkbox";
import Image from "next/image";
import { Color } from "../../../../../../next-type-models";
import { ProductFormState } from "@/app/actions/product-actions/add-product-action";
import toast from "react-hot-toast";
import Spinner from "@/app/components/spinner/spinner";

// Zod schema for stock validation
const stockSchema = z.object({
  color: z.string().min(1, { message: "رنگ باید انتخاب شود" }),
  size: z.string().min(1, { message: "سایز باید انتخاب شود" }),
  quantity: z.number().positive({ message: "تعداد باید بیشتر از ۰ باشد" }),
});

interface AddStockFormState {
  errors: {
    color?: string[];
    size?: string[];
    quantity?: string[];
  };
}

const featureSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "عنوان ویژگی باید وارد شود" }),
  description: z.string().min(1, { message: "توضیحات ویژگی باید وارد شود" }),
});

interface AddFeatureFormState {
  errors: {
    title?: string[];
    description?: string[];
  };
}

type Props = {
  colors: Color[];
};

const DashboardAddProductForm = ({ colors }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const [isInDiscountSection, setIsInDiscountSection] =
    useState<boolean>(false);
  const [isInHeroSection, setIsInHeroSection] = useState<boolean>(false);

  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // New state for previews

  const [features, setFeatures] = useState<Feature[]>([]);

  const [currentFeature, setCurrentFeature] = useState({
    id: `${Date.now()}`,
    title: "",
    description: "",
  });

  const [featureErrors, setFeatureErrors] = useState<AddFeatureFormState>({
    errors: {},
  });

  const [description, setDescription] = useState<string>("");

  const [stockItems, setStockItems] = useState<Stock[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const [stockError, setStockError] = useState<AddStockFormState>({
    errors: {},
  });

  const [formState, setFormState] = useState<ProductFormState>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    // Show loading toast
    const loadingToastId = toast.loading("در حال ایجاد محصول...");

    try {
      // Call server action
      const result = await actions.addProduct(
        category!,
        features,
        stockItems,
        { state: {} },
        formData
      );

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Check response and show appropriate toast
      if (result.state.success) {
        toast.success("ایجاد محصول با موفقیت انجام شد");
        // Optional: Redirect user if needed
      } else if (result.state.errors) {
        setFormState(result);
        toast.error("ایجاد محصول ناموفق بود. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };
  // const [formState, action] = useFormState(
  //   actions.addProduct.bind(null, category!, features, stockItems),
  //   {
  //     errors: {},
  //   }
  // );

  const handleColorSelection = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleSizeSelection = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handleAddStock = () => {
    // Validate stock data using the Zod schema
    const result = stockSchema.safeParse({
      color: selectedColor,
      size: selectedSize,
      quantity: Number(quantity),
    });

    if (!result.success) {
      setStockError({ errors: result.error.flatten().fieldErrors });
      return;
    }
    // Check if the stock item with the same color and size already exists
    const existingStockIndex = stockItems.findIndex(
      (stock) => stock.color === selectedColor && stock.size === selectedSize
    );

    if (existingStockIndex !== -1) {
      // If the item exists, update its quantity by adding the new quantity
      const updatedStockItems = [...stockItems];
      updatedStockItems[existingStockIndex].quantity += Number(quantity);

      setStockItems(updatedStockItems);
      setStockError({
        errors: {},
      }); // Clear any errors
      // Clear inputs after adding/updating stock
      setSelectedColor(null);
      setSelectedSize("");
      setQuantity(1);
    } else {
      // Ensure all fields (color, size, quantity) are selected/filled
      if (selectedColor && selectedSize && quantity > 0) {
        const newStock: Stock = {
          id: `${selectedColor}-${selectedSize}`,
          color: selectedColor,
          size: selectedSize,
          quantity: Number(quantity),
        };

        // Add the new stock item to the stockItems list
        setStockItems((prevItems) => [...prevItems, newStock]);
        setStockError({
          errors: {},
        }); // Clear any errors
        // Clear inputs after adding/updating stock
        setSelectedColor(null);
        setSelectedSize("");
        setQuantity(1);
      }
    }
  };

  const handleRemoveStock = (stockId: string) => {
    setStockItems((prev) => {
      return prev.filter((item) => item.id !== stockId);
    });
  };

  const sizeItems =
    sizes.find((size) => size.persian === category)?.sizes || [];

  const handleCategoryChange = (selectedSort: string | null) => {
    setCategory(selectedSort);
    setSelectedColor(null);
    setSelectedSize("");
    setQuantity(1);
    setStockError({
      errors: {},
    });
    setStockItems([]);
  };

  // Handle images selection
  // const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImages(e.target.files);
  //   }
  // };
  // Handle images selection
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImagePreviews = files.map((file) => URL.createObjectURL(file));
      setImages(e.target.files);
      setImagePreviews(newImagePreviews); // Update image previews
    }
  };
  const handleRemoveImage = (index: number) => {
    // Remove image from previews
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    // Remove image from FileList (images)
    if (images) {
      const updatedImages = new DataTransfer();
      Array.from(images).forEach((file, i) => {
        if (i !== index) {
          updatedImages.items.add(file);
        }
      });
      setImages(updatedImages.files);
    }
  };

  // Feature handling

  const handleSaveFeature = () => {
    const result = featureSchema.safeParse(currentFeature);

    if (!result.success) {
      setFeatureErrors({ errors: result.error.flatten().fieldErrors });
      return;
    }

    setFeatureErrors({ errors: {} });
    setFeatures((prevFeatures) => [...prevFeatures, currentFeature]);
    setCurrentFeature({ id: `${Date.now()}`, title: "", description: "" });
  };

  // Remove feature
  const handleRemoveFeature = (id: string) => {
    setFeatures((prevFeatures) =>
      prevFeatures.filter((feature) => feature.id !== id)
    );
  };

  // Reset form function
  const handleReset = () => {
    setTitle("");
    setModel("");
    setCategory(null);
    setBrand("");
    setPrice(0);
    setDiscount(0);
    setImages(null);
    setFeatures([]);
    setDescription("");
    setIsInHeroSection(false);
    setIsInDiscountSection(false);
  };

  const getColorById = (colorId: string) => {
    const color = colors.find((color) => color.id === colorId);
    return color;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-7 py-4 px-2 md:px-4"
    >
      {/* general information */}
      <DashedContainer label="اطلاعات کلی">
        <div className="w-full grid gap-5">
          <div className="w-full grid gap-5 bmlg:grid-cols-2">
            <Input
              label="نام محصول"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={formState?.state?.errors?.title?.[0]}
            />
            <Input
              label="مدل"
              name="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              error={formState?.state?.errors?.model?.[0]}
            />
          </div>
          <div className="w-full grid gap-5 bmlg:grid-cols-2">
            <Input
              label="برند"
              name="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              error={formState?.state?.errors?.brand?.[0]}
            />
            <div className="flex flex-col gap-1">
              <div
                className={`text-bodyMain ${
                  formState?.state?.errors?.category?.[0]
                    ? "text-state-error"
                    : "text-dark"
                }`}
              >
                دسته بندی
              </div>
              <div
                className={`h-[52px] bg-transparent text-customGray-700 border-2 border-dark rounded-l-[50px] rounded-tr-[10px] rounded-br-[30px] shadow-[0px_4px_var(--dark)] custom-transition hover:shadow-[0px_5px_var(--dark)] focus:shadow-[0px_2px_var(--dark)] focus:outline-none`}
              >
                <Dropdown
                  onSelectItem={handleCategoryChange}
                  selectedItem={category}
                  label={
                    <div
                      className={`flex items-center gap-1 ${
                        formState?.state?.errors?.category?.[0] &&
                        "text-state-error"
                      }`}
                    >
                      <SortIcon styles="size-6" />
                      دسته بندی
                    </div>
                  }
                  items={categoryItems}
                  styles={`rounded-l-[50px] rounded-tr-[10px] rounded-br-[30px] ${
                    formState?.state?.errors?.category?.[0] &&
                    "bg-state-error-200"
                  }`}
                />
              </div>
              {formState?.state?.errors?.category?.[0] && (
                <small className="text-state-error text-captionMain mt-1">
                  {formState?.state?.errors?.category?.[0]}
                </small>
              )}
            </div>
          </div>
        </div>
      </DashedContainer>
      {/* price and discount */}
      <DashedContainer label="قیمت">
        <div className="w-full grid gap-5 bmlg:grid-cols-2">
          <Input
            label="قیمت"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            min={0}
            error={formState?.state?.errors?.price?.[0]}
          />
          <Input
            label="درصد تخفیف"
            name="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value))}
            max={100}
            error={formState?.state?.errors?.discount?.[0]}
          />
        </div>
      </DashedContainer>
      {/* stock */}
      <DashedContainer label="رنگ / سایز / تعداد">
        {category ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <div className="flex gap-2.5 flex-wrap">
                {colors.map((color: Color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <ColorItem
                      key={color.id}
                      color={color}
                      isSelected={isSelected}
                      handleColorSelection={() =>
                        handleColorSelection(color.id)
                      }
                    />
                  );
                })}
              </div>
              {stockError.errors.color?.[0] && (
                <small className="text-state-error text-captionMain mt-1">
                  {stockError.errors.color?.[0]}
                </small>
              )}
            </div>

            {/* Size items */}
            <div className="flex flex-col w-full">
              <div className="flex flex-wrap gap-2.5 mt-3">
                {sizeItems.map((size: string) => {
                  const isSelected = selectedSize === size;
                  return (
                    <SizeItem
                      key={size}
                      isSelected={isSelected}
                      handleSizeSelection={handleSizeSelection}
                      size={size}
                    />
                  );
                })}
              </div>
              {stockError.errors.size?.[0] && (
                <small className="text-state-error text-captionMain mt-1">
                  {stockError.errors.size?.[0]}
                </small>
              )}
            </div>

            {/* Quantity Input */}
            <div className="flex flex-col gap-4 max-w-[410px]">
              <Input
                label="تعداد"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                error={stockError.errors.quantity?.[0]}
              />

              {/* Add Stock Button */}
              <Button
                type="button"
                color="primary-main"
                icon={<PlusIcon styles="size-6" />}
                onClick={handleAddStock}
              >
                افزودن موجودی
              </Button>
            </div>

            {formState?.state?.errors?.stock?.[0] && (
              <small className="text-state-error text-captionMain mt-1">
                {formState?.state?.errors?.stock?.[0]}
              </small>
            )}

            {/* Display added stock items */}
            <div className="flex gap-5 flex-wrap mt-8">
              {stockItems.map((stock) => {
                const color = getColorById(stock.color);
                return (
                  <div
                    key={stock.id}
                    className="flex gap-4 items-center px-3 py-2 border-4 rounded-lg relative"
                    style={{
                      borderColor: color?.hex,
                    }}
                  >
                    <div>
                      {color?.persian} /{stock.size} / {stock.quantity}
                    </div>
                    <div
                      onClick={() => handleRemoveStock(stock.id)}
                      className="cursor-pointer absolute -top-4 -left-4 rounded-full size-6 flex-center bg-state-error text-white custom-transition hover:scale-110"
                    >
                      <CloseIcon styles="size-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <small className="text-bodySmall text-state-error py-2 px-3 rounded-lg bg-state-error-200">
            ابتدا دسته بندی را انتخاب کنید.
          </small>
        )}
      </DashedContainer>
      {/* sections */}
      <DashedContainer label="در کدام قسمت ها باشد">
        <div className="flex flex-col gap-4 w-full">
          <Checkbox
            name="hero-section"
            label="در قسمت هیرو باشد؟"
            checked={isInHeroSection}
            handleCheckboxChange={setIsInHeroSection}
          />
          <Checkbox
            name="discount-section"
            label="در قسمت تخفیف باشد؟"
            checked={isInDiscountSection}
            handleCheckboxChange={setIsInDiscountSection}
          />
        </div>
      </DashedContainer>
      {/* images */}
      <DashedContainer label="تصاویر">
        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="images"
            className={`rounded-lg border border-dashed border-customGray-700 w-full h-full flex-center cursor-pointer relative ${
              formState?.state?.errors?.images?.[0] && "bg-state-error-200"
            }`}
          >
            <input
              type="file"
              name="images"
              id="images"
              className="w-full h-full hidden"
              onChange={handleImagesChange}
              multiple
            />
            <div className="flex flex-col items-center p-6">
              <UploadIcon styles="size-12 text-customGray-700" />
              <small className="text-bodySmall text-customGray-700 border-b border-dashed border-customGray-700 pb-0.5">
                بارگذاری تصاویر
              </small>
            </div>
            {images?.length && images?.length > 0 && (
              <div className="absolute top-2 left-2 rounded-full bg-customGray-200 text-customGray-700 text-bodyMain size-9 flex-center">
                {images?.length}
              </div>
            )}
          </label>
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((imageSrc, index) => (
                <div
                  key={imageSrc}
                  className="relative w-20 h-20 object-cover rounded-xl border border-customGray-300"
                >
                  <Image
                    src={imageSrc}
                    alt={`Preview ${index + 1}`}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="cursor-pointer absolute -top-3 -left-3 rounded-full size-6 flex-center bg-state-error text-white custom-transition hover:scale-110"
                  >
                    <CloseIcon styles="size-5" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {formState?.state?.errors?.images?.[0] && (
            <small className="text-state-error text-captionMain mt-1">
              {formState?.state?.errors?.images?.[0]}
            </small>
          )}
        </div>
      </DashedContainer>
      {/* features */}
      <DashedContainer label="ویژگی ها">
        <div className="flex flex-col gap-4 w-full">
          {/* Input for new feature */}
          <div className="flex flex-col gap-4 max-w-[410px] w-full">
            <Input
              label="عنوان ویژگی"
              name="new-feature-title"
              type="text"
              value={currentFeature.title}
              onChange={(e) =>
                setCurrentFeature({ ...currentFeature, title: e.target.value })
              }
              error={featureErrors.errors.title?.[0]}
            />
            <TextArea
              label="توضیحات ویژگی"
              name="new-feature-description"
              value={currentFeature.description}
              onChange={(e) =>
                setCurrentFeature({
                  ...currentFeature,
                  description: e.target.value,
                })
              }
              error={featureErrors.errors.description?.[0]}
            />

            {/* Save Feature Button */}
            <Button
              type="button"
              color="primary-main"
              icon={<PlusIcon styles="size-6" />}
              onClick={handleSaveFeature}
            >
              ذخیره ویژگی
            </Button>
          </div>

          {/* Saved features preview */}
          {features.length > 0 && (
            <div className="mt-4">
              <p className="text-bodyMain mb-5">ویژگی‌های ذخیره‌شده:</p>
              <div className="flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="flex gap-4 items-center relative py-2 px-3 rounded-xl bg-customGray-100 w-full lg:w-[calc(50%-8px)]"
                  >
                    <div className="flex flex-col w-full">
                      <div className="text-bodyMain text-dark line-clamp-1">
                        {`ویژگی ${index + 1} : ${feature.title}`}
                      </div>
                      <div className="text-bodySmall text-customGray-700 line-clamp-1">
                        {`توضیحات ویژگی ${index + 1} : ${feature.description}`}
                      </div>
                    </div>

                    <div
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="cursor-pointer absolute -top-3 -left-3 rounded-full size-6 flex-center bg-state-error text-white custom-transition hover:scale-110"
                    >
                      <CloseIcon styles="size-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formState?.state?.errors?.features?.[0] && (
            <small className="text-state-error text-captionMain mt-1">
              {formState?.state?.errors?.features?.[0]}
            </small>
          )}
        </div>
      </DashedContainer>

      {/* long description */}
      <DashedContainer label="توضیحات کلی">
        <div className="w-full">
          <TextArea
            label={`توضیحات`}
            name={`description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={formState?.state?.errors?.description?.[0]}
          />
        </div>
      </DashedContainer>
      {/* buttons */}
      <div className="flex gap-4">
        <Button
          type="submit"
          color="primary-main"
          icon={<PlusIcon styles="size-6" />}
          disabled={loading}
          loading={loading && <Spinner size={20} color="dark" />}
        >
          افزودن
        </Button>
        <Button
          onClick={handleReset}
          color="state-error"
          icon={<DeleteIcon styles="size-6" />}
          disabled={loading}
          loading={loading && <Spinner size={20} color="dark" />}
        >
          پاک کردن
        </Button>
      </div>
      {formState?.state?.errors?._form?.[0] && (
        <small className="text-state-error text-captionMain -mt-4">
          {formState?.state?.errors?._form?.[0]}
        </small>
      )}
    </form>
  );
};

export default DashboardAddProductForm;
