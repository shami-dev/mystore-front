type CardType = {
  name: string;
  priceRange: { min: number; max: number }; // change from priceCents
  imageUrl1: string;
  imageUrl2?: string;
  imageAlt: string;
};

export function Card({
  name,
  priceRange,
  imageUrl1,
  imageUrl2,
  imageAlt,
}: CardType) {
  const { min, max } = priceRange;
  const priceDisplay =
    min === max
      ? `€${(min / 100).toFixed(2)}`
      : `€${(min / 100).toFixed(2)} – €${(max / 100).toFixed(2)}`;

  return (
    <div className="card bg-base-100 max-w-max">
      <figure>
        <img
          src={imageUrl1}
          alt={imageAlt}
          className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:opacity-0"
        />
        {imageUrl2 && (
          <img
            src={imageUrl2}
            alt={imageAlt}
            className="absolute top-0 left-0 w-full h-auto object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          />
        )}
      </figure>
      <div className="card-body px-0 py-4">
        <p className="card-title font-normal text-base lg:text-lg">{name}</p>
        <p className="pt-2 text-base lg:text-lg text-gray-700 font-extrabold">
          {priceDisplay}
        </p>
      </div>
    </div>
  );
}
