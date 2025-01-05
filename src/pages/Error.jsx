import { Link } from "react-router-dom";
function Error() {
  return (
    <div className="flex flex-col  justify-center items-center bg-accent min-h-screen gap-10">
      <h1 className="text-4xl font-bold text-error">404 Not Found</h1>
      <Link to="/">
        <p className="text-primary-500 text-xl hover:bg-neutral font-bold px-4 py-2 rounded-md transition-all ease-linear duration-300">
          Go to home page
        </p>
      </Link>
    </div>
  );
}

export default Error;
