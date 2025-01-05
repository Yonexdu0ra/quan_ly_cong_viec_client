import { Spinner } from "@material-tailwind/react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-accent">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
