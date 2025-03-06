import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Alert, Button, Input, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebound from "../hooks/useDebound";
import validate from "../utils/validate";
import request from "../utils/request";
import { useToast } from '../context/toastContext'
function Register() {
  document.title = "Đăng ký tài khoản";
  const [showPassword, setShowPassword] = useState(false);
  const [usernameExist, setUsernameExist] = useState({
    isUernameExist: true,
    loading: false,
  });
  const { addMessage } = useToast();
  const [formData, setFormData] = useState({
    username: {
      error: false,
      message: "",
      value: "",
    },
    fullname: {
      error: false,
      message: "",
      value: "",
    },
    email: {
      error: false,
      message: "",
      value: "",
    },
    password: {
      error: false,
      message: "",
      value: "",
    },
  });
  const [deboundUsername] = useDebound(formData.username.value, 500);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await request("/register", {
        method: "POST",
        body: {
          username: formData.username.value,
          fullname: formData.fullname.value,
          email: formData.email.value,
          password: formData.password.value,
        },
      })
      addMessage(response);
    } catch (error) {
      addMessage({
        status: "error",
        message: error.message || 'Đã có lỗi xảy ra vui lòng thử lại sau.',
      })
    }
  };
  const handleChangeUsername = (e) => {
    const value = e.target.value;
    const isUsername = validate.isUsername(value);
    setFormData({
      ...formData,
      username: {
        value: value,
        error: !isUsername.status,
        message: isUsername.message,
      },
    });
  };

  const handleChangeFullname = (e) => {
    const value = e.target.value;
    const isFullname = validate.isFullname(value);
    setFormData({
      ...formData,
      fullname: {
        value: value,
        error: !isFullname.status,
        message: isFullname.message,
      },
    });
  };
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    const isEmail = validate.isEmail(value);
    setFormData({
      ...formData,
      email: {
        value: value,
        error: !isEmail.status,
        message: isEmail.message,
      },
    });
  };
  const handleChangePassword = (e) => {
    const value = e.target.value;
    const isPassword = validate.isPassword(value);
    setFormData({
      ...formData,
      password: {
        value: value,
        error: !isPassword.status,
        message: isPassword.message,
      },
    });
  };
  useEffect(() => {
    setUsernameExist({
      ...usernameExist,
      loading: true,
      isUernameExist: true,
    });
    if (!validate.isUsername(deboundUsername).status) {
      
      return setUsernameExist({
        ...usernameExist,
        loading: false,
        isUernameExist: true,
      });
    };
    
    const checkUsername = async () => {
      try {
        const response = await request(
          "/check-username?username=" + deboundUsername
        );
        // console.log(response);
        if (response.status === "error") {
          setUsernameExist({
            ...usernameExist,
            loading: false,
            isUernameExist: true,
          })
          setFormData({
            ...formData,
            username: {
              ...formData.username,
              error: true,
              message: response.message,
            },
          })
          return;
        }
        setUsernameExist({
          ...usernameExist,
          isUernameExist: false,
          loading: false,
        });
      } catch (error) {
        setUsernameExist({
          ...usernameExist,
          loading: true,
        });
        return;
      } 
    };
    checkUsername();
  }, [deboundUsername]);
  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <form
        className="flex flex-col gap-4 max-w-xl w-full p-4 rounded-md border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-xl sm:text-4xl font-bold">
          Đăng ký tài khoản
        </h1>
        <Input
          label="Tài khoản"
          name="username"
          color="blue-gray"
          onChange={handleChangeUsername}
          required
          error={formData.username.error}
          
        />
        <Alert color="red" open={formData.username.error}>
          {formData.username.message}
        </Alert>
        {usernameExist.loading && <p>Đang kiểm tra tài khoản...</p>}
        {!usernameExist.isUernameExist && <p className="text-green-500">Tài khoản này có thể dùng.</p>}
        <Input
          label="Họ và tên"
          color="blue-gray"
          name="fullname"
          required
          onChange={handleChangeFullname}
          error={formData.fullname.error}
        />
        <Alert color="red" open={formData.fullname.error}>
          {formData.fullname.message}
        </Alert>
        <Input
          label="Email"
          color="blue-gray"
          type="email"
          name="email"
          required
          onChange={handleChangeEmail}
          error={formData.email.error}
        />
        <Alert color="red" open={formData.email.error}>
          {formData.email.message}
        </Alert>
        <Input
          label="Mật khẩu"
          color="blue-gray"
          type={showPassword ? "text" : "password"}
          name="password"
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
          required
          onChange={handleChangePassword}
          error={formData.password.error}
        />
        <Alert color="red" open={formData.password.error}>
          {formData.password.message}
        </Alert>

        <Button type="submit" className="bg-primary-500">
          Đăng ký
        </Button>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>
            Nếu bạn đã có tài khoản hãy đăng nhập{" "}
            <Link to="/login">
              <span className="text-blue-500">tại đây</span>
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
