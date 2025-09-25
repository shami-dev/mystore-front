import { Link } from "react-router-dom";
import { Card } from "../components/Card";

const products = [
  {
    id: 111,
    name: "Women's Dri-FIT Short-Sleeve Top",
    priceCents: 3299,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758312817/Women_s_Dri-FIT_Short-Sleeve_Top_bbsruu.avif",
    imageUrl2: "",
    imageAlt: "White short-sleeve top",
  },
  {
    id: 222,
    name: "Women's Dri-FIT Short-Sleeve Top",
    priceCents: 5499,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758387805/Women_s_Dri-FIT_1_4-Zip_Running_Top_Black_xgh0k9.avif",
    imageUrl2: "",
    imageAlt: "Black performance running top",
  },
  {
    id: 333,
    name: "Women's Dri-FIT Strappy Tank Top",
    priceCents: 2999,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758388033/Women_s_Dri-FIT_Strappy_Tank_Top_Black_ycy8w9.avif",
    imageUrl2: "",
    imageAlt: "Black strappy tank",
  },
  {
    id: 444,
    name: "Women's 8cm (approx.) Shorts",
    priceCents: 3499,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758388481/Women_s_8cm_approx._Navy_Blue_uvw19h.avif",
    imageUrl2: "",
    imageAlt: "Blue women's shorts",
  },
  {
    id: 555,
    name: "Women's Dri-FIT Mid-Rise 8cm",
    priceCents: 2999,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758312819/Women_s_Dri-FIT_Mid-Rise_8cm_approx._iqt0xp.avif",
    imageUrl2: "",
    imageAlt: "Navy blue Dri-FIT Mid-Rise shorts",
  },
  {
    id: 666,
    name: "Women's Dri-FIT High-Waisted 8cm",
    priceCents: 4499,
    imageUrl1:
      "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758390744/Women_s_Dri-FIT_High-Waisted_8cm_Cannon_fmmzkv.avif",
    imageUrl2: "",
    imageAlt: "Blue high-waisted 2 in 1 shorts",
  },
];

export function ProductListPage() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center
"
    >
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <Card
            imageUrl1={product.imageUrl1}
            imageAlt={product.imageAlt}
            name={product.name}
            priceCents={product.priceCents}
          />
        </Link>
      ))}
    </div>
  );
}
