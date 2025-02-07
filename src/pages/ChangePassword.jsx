import { Alert, Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { request } from "../utils/request";

function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: {
      value: "",
      error: false,
      message: "",
    },
    newPassword: {
      value: "",
      error: false,
      message: "",
    },
    confirmPassword: {
      value: "",
      error: false,
      message: "",
    },
  });

  const validateInputs = (name, value) => {
    switch (name) {
      case "oldPassword":
        if (value.length < 6) {
          return {
            error: true,
            message: "Mật khẩu phải có ít nhất 6 ký tự",
          };
        }
        break;
      case "newPassword":
        if (value.length < 6) {
          return {
            error: true,
            message: "Mật khẩu phải có ít nhất 6 ký tự",
          };
        }
        if (value !== data.confirmPassword.value) {
          return {
            error: true,
            message: "Mật khẩu không khớp",
          };
        }
        return { error: false, message: "" };
      case "confirmPassword":
        if (value !== data.newPassword.value) {
          return {
            error: true,
            message: "Mật khẩu không khớp",
          };
        }
        return { error: false, message: "" };
      default:
        return { error: false, message: "" };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInputs(name, value);

    setData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        ...validation,
      },
    }));
  };

  const isDisabled = Object.values(data).some(
    (field) => field.error || !field.value
  );
  const handleSubmit = async () => {
    setData({
      oldPassword: {
        value: "",
        error: false,
        message: "",
      },
      newPassword: {
        value: "",
        error: false,
        message: "",
      },
      confirmPassword: {
        value: "",
        error: false,
        message: "",
      },
    });
    try {
      const { status, message } = await request("/me/change-password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword: data.oldPassword.value,
          newPassword: data.newPassword.value,
          confirmPassword: data.confirmPassword.value,
        }),
      });
      alert(message);
    } catch (error) {
      console.log(error);
      alert(error.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="h-full flex justify-center items-center font-mono">
      <div className="flex flex-col justify-center items-center bg-neutral px-8 py-4 rounded gap-4 w-full max-w-2xl">
        <h1 className="text-2xl sm:text-4xl">Đổi mật khẩu</h1>
        <Input
          name="oldPassword"
          label="Mật khẩu cũ"
          color="white"
          onChange={handleChange}
          type="password"
        />
        {data.oldPassword.error && (
          <Alert color="red">{data.oldPassword.message}</Alert>
        )}
        <Input
          name="newPassword"
          label="Mật khẩu mới"
          color="white"
          onChange={handleChange}
          type="password"
        />
        {data.newPassword.error && (
          <Alert color="red">{data.newPassword.message}</Alert>
        )}
        <Input
          name="confirmPassword"
          label="Xác nhận lại mật khẩu mới"
          color="white"
          onChange={handleChange}
          type="password"
        />
        {data.confirmPassword.error && (
          <Alert color="red">{data.confirmPassword.message}</Alert>
        )}
        <Button
          color="green"
          disabled={isDisabled}
          className="w-full sm:w-44"
          onClick={handleSubmit}
        >
          Thay đổi
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
