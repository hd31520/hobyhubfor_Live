import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">Something went wrong.</p>
      <p className="text-sm text-gray-500 mb-6">
        {error.statusText || error.message || "Unknown error"}
      </p>
      <a href="/" className="text-blue-600 underline">
        Go back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
