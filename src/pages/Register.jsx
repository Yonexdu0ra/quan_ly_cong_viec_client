import { Button, Input } from "@material-tailwind/react";
import useResize from "../hooks/useResize";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { request } from "../utils/request";
import { authenticationContext } from "../context/authenticationContext";
function Register() {
  const { height } = useResize();
  const [data, setData] = useState({})
  const { loginData } = useContext(authenticationContext);
  const [validate, setValidate] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    username: {
      error: false,
      message: "",
    },
    fullname: {
      error: false,
      message: "",
    },
  });
  if(loginData.id) {
      return <Navigate to="/"/>;
    }
  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setData({...data, username: value})
    if (value.length < 5) {
      setValidate({
        ...validate,
        username: {
          error: true,
          message: "Tài khoản phải có ít nhất 5 kí tự",
        },
      });
    } else {
      setValidate({
        ...validate,
        username: {
          error: false,
          message: "",
        },
      });
    }
  };
  const hanndleChangeFullname = (e) => {
    const value = e.target.value;
    setData({...data, fullname: value})
    if (value.length < 5) {
      setValidate({
        ...validate,
        fullname: {
          error: true,
          message: "Họ và tên phải có ít nhất 5 kí tự",
        },
      });
    } else {
      setValidate({
        ...validate,
        fullname: {
          error: false,
          message: "",
        },
      });
    }
  }
  const handleChangePassword = (e) => {
    const value = e.target.value;
    setData({...data, password: value})
    if (value.length < 5) {
      setValidate({
        ...validate,
        password: {
          error: true,
          message: "Mật khẩu phải có ít nhất 5 kí tự",
        },
      });
    } else {
      setValidate({
        ...validate,
        password: {
          error: false,
          message: "",
        },
      });
    }
  }
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setData({...data, email: value})
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setValidate({
        ...validate,
        email: {
          error: true,
          message: "Email không hợp lệ",
        },
      });
    } else {
      setValidate({
        ...validate,
        email: {
          error: false,
          message: "",
        },
      });
  }}
  const handleSubmit = async () => {
    try {
      const response = await request('/register', {
        body: JSON.stringify(data),
      })
      // console.log(response);
      alert(response.message)
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <div
      className="flex justify-center items-center bg-accent text-white h-screen"
      
    >
      <div className="bg-layer px-6 py-3 rounded-lg flex flex-col gap-7 h-full w-full sm:max-w-lg sm:h-auto justify-center items-center">
        <h1 className="text-4xl font-mono">Quản lý công việc</h1>
        <Input
          color="white"
          label="Tài khoản"
          error={validate.username.error}
          onChange={handleChangeUsername}
        />
        {validate.username.error && (
          <p className="text-error">{validate.username.message}</p>
        )}
        <Input
          color="white"
          label="Họ và tên"
          error={validate.fullname.error}
          onChange={hanndleChangeFullname}
        />
        <Input
          color="white"
          label="Email"
          error={validate.email.error}
          onChange={handleChangeEmail}
        />
        <Input
          color="white"
          label="Mật khẩu"
          type="password"
          error={validate.password.error}
          onChange={handleChangePassword}
        />
        <Button
          className="bg-primary-600 text-primary-50"
          onClick={handleSubmit}
        >
          Đăng ký
        </Button>
        <div className="flex justify-between">
          <p>
            Nếu bạn đã có tài khoản hãy đăng nhập{" "}
            <Link to="/login">
              <span className="text-blue-500">tại đây.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
