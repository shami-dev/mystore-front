import { useEffect, useState } from "react";

interface ModalProps {
  allOutOfStock?: boolean;
  productName?: string;
  productSize?: string | null;
  productPrice?: number;
  productCount?: number;
}

export function Modal({
  allOutOfStock = false,
  productName,
  productSize,
  productPrice = 0,
  productCount,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = window.setTimeout(() => {
        setIsOpen(false);
      }, 50000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div>
      <button
        className="btn btn-lg btn-neutral w-full rounded-full disabled:btn-disabled font-normal hover:opacity-60"
        onClick={() => setIsOpen(true)}
        disabled={allOutOfStock}
      >
        {allOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>

      {isOpen && (
        <dialog open className="modal modal-bottom lg:modal-end no-scrollbar">
          <div className="modal-box lg:absolute lg:top-0 lg:h-fit rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none">
            <h2 className="font-bold text-lg py-6 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              Added to Cart
            </h2>
            <p>{productName}</p>
            <p>{productSize}</p>
            <p>€{(productPrice / 100).toFixed(2)}</p>
            <div className="flex flex-col gap-y-3 mt-4">
              <button className="btn btn-outline rounded-full text-base lg:text-lg">
                {`View Cart (${productCount})`}
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
