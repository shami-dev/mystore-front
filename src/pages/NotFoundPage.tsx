import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-5xl lg:text-6xl font-bold text-balance">
          Page Not Found.
        </h1>
        <p className="mt-6 text-base lg:text-lg">
          We can't find the page you are looking for. Sorry for the
          inconvenience.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className="btn btn-outline text-base lg:text-lg">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
