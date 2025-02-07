import { Button, Input } from "@material-tailwind/react";
import useResize from "../hooks/useResize";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { request } from "../utils/request";
import { authenticationContext } from "../context/authenticationContext";
function Login() {
  const { height } = useResize();
  const { loginData, setLoginData } = useContext(authenticationContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  if (loginData.id) {
    return <Navigate to="/" />;
  }

  // const navigate = useNavigate();
  const handleChangeUsername = (e) => {
    setData({ ...data, username: e.target.value });
  };
  const handleChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await request("/login", {
        body: JSON.stringify(data),
      });

      if (response.status === "success") {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        setLoginData(response.data.user);
        return;
      }
      if(response.status === "error") {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-accent text-white box-border"
      style={{ height: "100vh" }}
    >
      <div className="bg-layer px-6 py-3 rounded-lg flex flex-col gap-7 h-full w-full sm:max-w-lg sm:h-auto justify-center items-center">
        <h1 className="text-4xl font-mono">Quản lý công việc</h1>
        <Input
          color="white"
          label="Tài khoản"
          onChange={handleChangeUsername}
        />
        <Input
          color="white"
          label="Mật khẩu"
          type="password"
          onChange={handleChangePassword}
        />
        <Button
          className="bg-primary-600 text-primary-50"
          onClick={handleSubmit}
        >
          Đăng nhập
        </Button>
        <div className="flex justify-between">
          <p>
            Nếu bạn chưa có tài khoản hãy đăng ký{" "}
            <Link to="/register">
              <span className="text-blue-500">tại đây.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
