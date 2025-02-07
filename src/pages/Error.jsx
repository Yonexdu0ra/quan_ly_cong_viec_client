import { Link, useRouteError } from "react-router-dom";

function Error() {
    const { error , statusText } = useRouteError();
    console.log(error);
    
    return (
      <div className="flex flex-col items-center justify-center bg-secondary-900 h-screen gap-4">
        <h1 className="text-4xl font-bold text-error-500">{statusText}</h1>
        <p className="text-warning-900 text-2xl font-mono">{error?.message}</p>
        <Link to={'/'}>
            <p className="text-primary-500 text-xl hover:bg-primary-100  px-4 py-2 rounded-md duration-300">Quay lại trang chủ</p>
        </Link>
      </div>
    );
}

export default Error;