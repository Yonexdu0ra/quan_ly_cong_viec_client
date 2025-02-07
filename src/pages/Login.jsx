import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/authenticationContext";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import request from "../utils/request";
function Login() {
  document.title = "Đăng nhập";
  const [data, setData] = useState();
  const { loginData, setLoginData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { addMessage } = useToast();
  const disabled =
    !data?.username ||
    !data?.password ||
    data?.username.length < 5 ||
    data?.password.length < 6;
  const handleChangeUsername = (e) => {
    setData({ ...data, username: e.target.value });
  };
  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/login", {
        method: "POST",
        body: data,
      });
      if (response.status === "success") {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        setLoginData(response.data.user);
      }
      addMessage(response)
      
    } catch (error) {
      

      addMessage({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau",
      });
    }
    return
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <form
        className="flex flex-col gap-4 max-w-xl w-full p-4 rounded-md border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-xl sm:text-4xl font-bold">
          Đăng nhập hệ thống
        </h1>
        <Input
          label="Tài khoản"
          color="blue-gray"
          onChange={handleChangeUsername}
        />
        <Input
          label="Mật khẩu"
          color="blue-gray"
          onChange={handleChangePassword}
          type={showPassword ? "text" : "password"}
          icon={
            showPassword ? (
              <EyeIcon
                onClick={handleShowPassword}
                className="cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={handleShowPassword}
                className="cursor-pointer"
              />
            )
          }
        />
        <Button type="submit" className="bg-primary-500" disabled={disabled}>
          Đăng nhập
        </Button>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link to={"/forgot-password"}>
            <p className="text-blue-500">Quên mật khẩu</p>
          </Link>
          <p>
            Nếu bạn chưa có tài khoản hãy đăng ký{" "}
            <Link to="/register">
              <span className="text-blue-500">tại đây</span>
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
