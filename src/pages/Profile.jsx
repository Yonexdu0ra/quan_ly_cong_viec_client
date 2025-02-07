import { Alert, Button, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { useAuth } from "../context/authenticationContext";
import { useToast } from "../context/toastContext";
import request from "../utils/request";
function Profile() {
  document.title = "Thông tin cá nhân";
  const { loginData, setLoginData } = useAuth();
  console.log(loginData);

  const MAX_LENGTH_DESCRIPTION = 500;
  const MAX_LENGTH_PHONE = 10;
  const MAX_LENGTH_FULLNAME = 25;
  const { addMessage } = useToast();
  const [formData, setFormData] = useState({
    fullname: {
      error: false,
      message: "",
      value: loginData.fullname,
    },
    phone: {
      error: false,
      message: "",
      value: loginData.phone,
    },
    description: {
      error: false,
      message: "",
      value: loginData.description,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/me", {
        method: "PUT",
        body: {
          fullname: formData.fullname.value,
          phone: formData.phone.value,
          description: formData.description.value,
        },
      });
      if (response.status === "success") {
        setLoginData({
          ...loginData,
          ...response.data,
        });
      }

      addMessage(response)
    } catch (error) {
      console.log(error);
      addMessage({
        status: "error",
        message: error.message || "Có lỗi xảy ra",
      });
    }
  };
  const handleChangeDescription = (e) => {
    const value = e.target.value;

    if (value.length > 500) {
      return;
    }

    setFormData({
      ...formData,
      description: {
        value: value,
        error: false,
        message: "",
      },
    });
  };
  const handleChangePhone = (e) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH_PHONE) return;
    setFormData({
      ...formData,
      phone: {
        value: value,
        error: false,
        message: "",
      },
    });
  };
  const handleChangeFullname = (e) => {
    const value = e.target.value;

    if (value.length > MAX_LENGTH_FULLNAME) return;
    setFormData({
      ...formData,
      fullname: {
        value: value,
        error: false,
        message: "",
      },
    });
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="max-w-xl w-full">
          <div className="flex justify-center items-center px-4 py-2 h-full flex-col gap-4">
            <form
              className="flex flex-col gap-4 w-full overflow-y-auto shadow px-4 py-4 rounded-md"
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl font-bold sm:text-4xl text-center">
                Thông tin cá nhân
              </h1>

              <Input
                label="Tài khoản"
                value={loginData.username}
                color="gray"
                disabled
              />
              <Input
                label="Họ và tên"
                color="gray"
                value={formData.fullname.value}
                required
                onChange={handleChangeFullname}
              />
              {/* <Alert color="red" open={formData.fullname.error}>
                {formData.fullname.message}
              </Alert> */}
              <p className="flex justify-end text-gray-500 items-center gap-1">
                <span
                  className={`${
                    formData.fullname.value.length >= MAX_LENGTH_FULLNAME
                      ? "text-red-500 scale-125 duration-300"
                      : ""
                  } `}
                >
                  {formData.fullname.value.length}
                </span>
                /{MAX_LENGTH_FULLNAME}
              </p>
              <Input
                label="Email"
                value={loginData.email}
                color="gray"
                disabled
              />

              <Input
                label="Số điện thoại"
                color="gray"
                required
                onChange={handleChangePhone}
                value={formData.phone.value || ""}
              />
              {/* <Alert color="red" open={formData.phone.error}>
                {formData.phone.message}
              </Alert> */}
              <p className="flex justify-end text-gray-500 items-center gap-1">
                <span
                  className={`${
                    formData.phone.value?.length >= MAX_LENGTH_PHONE
                      ? "text-red-500 scale-125 duration-300"
                      : ""
                  } `}
                >
                  {formData.phone.value?.length}
                </span>
                /{MAX_LENGTH_PHONE}
              </p>
              <Textarea
                label="Tiểu sử"
                color="gray"
                rows={15}
                value={formData.description.value}
                onChange={handleChangeDescription}
                required
              />
              <p className="flex justify-end text-gray-500 items-center gap-1">
                <span
                  className={`${
                    formData.description.value.length >= MAX_LENGTH_DESCRIPTION
                      ? "text-red-500 scale-125 duration-300"
                      : ""
                  } `}
                >
                  {formData.description.value.length}
                </span>
                /{MAX_LENGTH_DESCRIPTION}
              </p>
              {/* <Alert color="red">Lỗi</Alert> */}

              <Button type="submit" className="bg-primary-500">
                Cập nhật
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
