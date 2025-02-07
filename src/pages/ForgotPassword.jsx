import { Alert, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import validate from "../utils/validate";
import { useState } from "react";
import { useToast } from "../context/toastContext";
import request from "../utils/request";
function ForgotPassword() {
  document.title = "Quên mật khẩu";
  const [formData, setFormData] = useState({
    email: {
      error: false,
      message: "",
      value: "",
    },
  });
  const { addMessage } = useToast();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/forgot-password", {
        method: "POST",
        body: {
          email: formData.email.value,
        },
      });
      addMessage(response)
    } catch (error) {
      console.log(error);
      addMessage({
        status: 'error',
        message: error.message || "Lỗi"
      })
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <form
        className="flex flex-col gap-4 max-w-xl w-full p-4 rounded-md border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-xl sm:text-4xl font-bold">
          Quên mật khẩu
        </h1>
        <Input
          label="Email"
          color="blue-gray"
          onChange={handleChangeEmail}
          error={formData.email.error}
          required
        />
        <Alert color="red" open={formData.email.error}>
          {formData.email.message}
        </Alert>
        <Button type="submit" className="bg-primary-500">
          Xác nhận
        </Button>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Link to={"/login"}>
            <p className="text-blue-500">Quay lại trang đăng nhập</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
