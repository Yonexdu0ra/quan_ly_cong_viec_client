import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Alert, Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useToast } from "../context/toastContext";
import request from "../utils/request";
function ChangePassword() {
  document.title = "Đổi mật khẩu";
  const MAX_LENGTH_PASSSWORD = 25;

  const [password, setPassword] = useState({
    currentPassword: {
      error: false,
      message: "",
      value: "",
    },
    newPassword: {
      error: false,
      message: "",
      value: "",
    },
    confirmPassword: {
      error: false,
      message: "",
      value: "",
    },
  });
  const { addMessage } = useToast();
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleShowCurrentPassword = () => {
    setShowPassword({
      ...showPassword,
      currentPassword: !showPassword.currentPassword,
    });
  };
  const handleShowNewPassword = () => {
    setShowPassword({
      ...showPassword,
      newPassword: !showPassword.newPassword,
    });
  };
  const handleShowConfirmPassword = () => {
    setShowPassword({
      ...showPassword,
      confirmPassword: !showPassword.confirmPassword,
    });
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;

    if (value.length > MAX_LENGTH_PASSSWORD) {
      setPassword({
        ...password,
        currentPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không quá 25 ký tự",
        },
      });
      return;
    }
    if (value.length < 1) {
      setPassword({
        ...password,
        currentPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không được để trống",
        },
      });
      return;
    }
    setPassword({
      ...password,
      currentPassword: {
        ...password.currentPassword,
        value: value,
        error: false,
        message: "",
      },
    });
  };
  const handleChangeNewPassword = (e) => {
    const value = e.target.value;

    if (value.length > MAX_LENGTH_PASSSWORD) {
      setPassword({
        ...password,
        newPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không quá 25 ký tự",
        },
      });
      return;
    }
    if (value.length < 1) {
      setPassword({
        ...password,
        newPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không được để trống",
        },
      });
      return;
    }

    setPassword({
      ...password,
      newPassword: {
        ...password.newPassword,
        value: value,
        error: false,
        message: "",
      },
      confirmPassword: {
        ...password.confirmPassword,
        error:
          password.confirmPassword.value !== value &&
          password.confirmPassword.value.length > 0,
        message:
          password.confirmPassword.value !== value &&
          password.confirmPassword.value.length > 0
            ? "Mật khẩu không trùng khớp"
            : "",
      },
    });
  };
  const handleConfirmPassword = (e) => {
    const value = e.target.value;

    if (value.length > MAX_LENGTH_PASSSWORD) {
      setPassword({
        ...password,
        confirmPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không quá 25 ký tự",
        },
      });
      return;
    }
    if (value.length < 1) {
      setPassword({
        ...password,
        confirmPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không được để trống",
        },
      });
      return;
    }
    if (value !== password.newPassword.value) {
      setPassword({
        ...password,
        confirmPassword: {
          value: value,
          error: true,
          message: "Mật khẩu không trùng khớp",
        },
      });
      return;
    }
    setPassword({
      ...password,
      confirmPassword: {
        ...password.confirmPassword,
        value: value,
        error: false,
        message: "",
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request("/me/change-password", {
        method: "POST",
        body: {
          currentPassword: password.currentPassword.value,
          newPassword: password.newPassword.value,
          confirmPassword: password.confirmPassword.value,
        },
      });

      addMessage(response);
    } catch (error) {
      console.log(error);
      addMessage({
        status: "error",
        message: error.message || "Lỗi",
      });
    }
  };
  return (
    <div className="w-full h-full select-none">
      <div className="flex justify-center w-full h-full">
        <div className="max-w-xl w-full">
          <div className="flex justify-center items-center px-4 py-2 h-full flex-col gap-4">
            <form
              className="flex flex-col gap-4 w-full sm:shadow sm:rounded-md  sm:px-8 sm:py-4"
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl font-bold sm:text-4xl text-center">
                Đổi mật khẩu
              </h1>

              <Input
                label="Mật khẩu hiện tại"
                color="gray"
                type={showPassword.currentPassword ? "text" : "password"}
                icon={
                  showPassword.currentPassword ? (
                    <EyeIcon
                      onClick={handleShowCurrentPassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeSlashIcon
                      onClick={handleShowCurrentPassword}
                      className="cursor-pointer"
                    />
                  )
                }
                onChange={handleChangePassword}
                error={password.currentPassword.error}
                required
              />
              <Alert color="red" open={password.currentPassword.error}>
                {password.currentPassword.message}
              </Alert>

              <Input
                label="Mật khẩu mới"
                color="gray"
                type={showPassword.newPassword ? "text" : "password"}
                icon={
                  showPassword.newPassword ? (
                    <EyeIcon
                      onClick={handleShowNewPassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeSlashIcon
                      onClick={handleShowNewPassword}
                      className="cursor-pointer"
                    />
                  )
                }
                onChange={handleChangeNewPassword}
                error={password.newPassword.error}
                required
              />
              <Alert color="red" open={password.newPassword.error}>
                {password.newPassword.message}
              </Alert>

              <Input
                label="Xác nhận lại mật khẩu mới"
                color="gray"
                type={showPassword.confirmPassword ? "text" : "password"}
                icon={
                  showPassword.confirmPassword ? (
                    <EyeIcon
                      onClick={handleShowConfirmPassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeSlashIcon
                      onClick={handleShowConfirmPassword}
                      className="cursor-pointer"
                    />
                  )
                }
                onChange={handleConfirmPassword}
                error={password.confirmPassword.error}
                required
              />
              <Alert color="red" open={password.confirmPassword.error}>
                {password.confirmPassword.message}
              </Alert>
              <Button type="submit" className="bg-primary-500">
                Xác nhận
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
