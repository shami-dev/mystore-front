import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="hero min-h-screen bg-[image-set(url('https://res.cloudinary.com/djqdtvv7u/image/upload/v1760436914/woman-in-top-and-shorts_whdpi7.avif')_type('image/avif'),url('https://res.cloudinary.com/djqdtvv7u/image/upload/v1760436914/woman-in-top-and-shorts_whdpi7.webp')_type('image/webp'),url('https://res.cloudinary.com/djqdtvv7u/image/upload/v1760436914/woman-in-top-and-shorts_whdpi7.png')_type('image/png'))] bg-cover bg-top">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl lg:text-6xl font-bold">
            Effortless Style, Defined.
          </h1>
          <p className="mb-5 text-base lg:text-lg">
            Check out the latest arrivals
          </p>
          <Link to="/products" className="btn btn-outline btn-lg">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
