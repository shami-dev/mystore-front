import { useEffect, useState } from "react";

interface ModalProps {
  allOutOfStock?: boolean;
  productName?: string;
  productSize?: string | null;
  productPrice?: number;
  totalItems?: number;
  onValidationError?: (hasError: boolean) => void;
  onAddToCart?: () => void;
}

export function Modal({
  allOutOfStock = false,
  productName,
  productSize,
  productPrice = 0,
  totalItems,
  onValidationError,
  onAddToCart,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    if (!productName || !productSize) {
      onValidationError?.(true);
      return;
    }
    onValidationError?.(false);
    onAddToCart?.();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => setIsOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div>
      <div className="divider md:hidden py-0"></div>
      <button
        className="btn btn-lg btn-neutral w-full rounded-full disabled:btn-disabled font-normal hover:opacity-60 my-6"
        onClick={handleAddToCart}
        disabled={allOutOfStock}
      >
        {allOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>

      {isOpen && (
        <dialog open className="modal modal-bottom lg:modal-end no-scrollbar">
          <div className="modal-box lg:absolute lg:top-0 lg:h-fit rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none">
            <h2 className="font-bold text-lg py-6 flex items-center gap-1">
              ✅ Added to Cart
            </h2>
            <p>{productName}</p>
            <p>{productSize}</p>
            <p>€{(productPrice / 100).toFixed(2)}</p>
            <div className="flex flex-col gap-y-3 mt-4">
              <button className="btn btn-outline rounded-full text-base lg:text-lg">
                {`View Cart (${totalItems})`}
              </button>
              <button className="btn btn-neutral rounded-full text-base lg:text-lg font-normal hover:opacity-60">
                Checkout
              </button>
              <div className="modal-action">
                <button
                  className="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
