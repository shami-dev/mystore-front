type CardType = {
  name: string;
  priceCents: number;
  imageUrl1: string;
  //   imageUrl2: string;
  imageAlt: string;
};

export function Card({ name, priceCents, imageUrl1, imageAlt }: CardType) {
  return (
    <div className="card bg-base-100 max-w-max">
      <figure>
        {imageUrl1 && (
          <img
            width={360}
            height="auto"
            className="hover:scale-105 transition-transform duration-300 ease-in-out"
            src={imageUrl1}
            alt={imageAlt}
          />
        )}
      </figure>
      <div className="card-body px-0 py-4">
        <p className="card-title font-normal text-base lg:text-lg">{name}</p>
        <p className="pt-2 text-base lg:text-lg text-gray-700 font-extrabold">
          €{(priceCents / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
