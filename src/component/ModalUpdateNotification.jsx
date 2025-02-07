import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import useResize from "../hooks/useResize";
import { useToast } from "../context/toastContext";
import request from "../utils/request";
import { useRef, useState } from "react";
import { useSchedule } from "../context/scheduleContext";
function formatDateForInput(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Thêm '0' nếu cần
  const day = String(d.getDate()).padStart(2, "0"); // Thêm '0' nếu cần
  return `${year}-${month}-${day}`;
}
function ModalUpdateNotification({ open, onClose, data }) {
  const { addMessage } = useToast();
  const { setScheduleData } = useSchedule();
  const today = new Date();
  today.setMinutes(today.getMinutes() + 5);
  const currentDate = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().split(" ")[0];

  const formRef = useRef(null);
  const MAX_LENGTH_TITLE = 255;
  const MAX_LENGTH_CONTENT = 1000;
  const [formData, setFormData] = useState({
    title: {
      error: false,
      message: "",
      value: data.title,
    },
    content: {
      error: false,
      message: "",
      value: data.content,
    },
    date: {
      error: false,
      message: "",
      value: formatDateForInput(new Date(data.date)),
    },
    time: {
      error: false,
      message: "",
      value: data.time.split(":").slice(0, 2).join(":"),
    },
  });

  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH_TITLE) return;
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        value,
      },
    });
  };
  const handleChangeContent = (e) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH_CONTENT) return;
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        value,
      },
    });
  };
  const handleChangeDate = (e) => {
    const value = e.target.value;
    console.log(value);

    setFormData({
      ...formData,
      date: {
        ...formData.date,
        value,
      },
    });
  };
  const handleChangeTime = (e) => {
    const value = e.target.value;
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();

    const [hours, minutes] = value.split(":");
    if (parseInt(hours) < currentHours) {
      setFormData({
        ...formData,
        time: {
          ...formData.time,
          value,
          error: true,
          message: "Thời gian không hợp lệ",
        },
      });
      return;
    }
    if (
      parseInt(hours) === currentHours &&
      parseInt(minutes) < currentMinutes
    ) {
      setFormData({
        ...formData,
        time: {
          ...formData.time,
          value,
          error: true,
          message: "Thời gian phải cách thời gian hiện tại ít nhất 5 phút",
        },
      });
      return;
    }
    setFormData({
      ...formData,
      time: {
        ...formData.time,
        value,
        error: false,
        message: "",
      },
    });
  };

  const handleClickButtonSubmit = (e) => {
    if (!formRef.current) {
      return;
    }
    formRef.current.requestSubmit();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/schedule/" + data.id, {
        method: "PUT",
        body: {
          title: formData.title.value,
          content: formData.content.value,
          date: formData.date.value,
          time: formData.time.value,
        },
      });

      if (response.status === "success") {
        setScheduleData((prevData) => ({
          ...prevData,
          
          rows: prevData.rows.map((item) => {
            if (item.id === response.data.id) {
              return {
                ...item,
                ...response.data,
              };
            }
            return item;
          }),
        }));
      }
      addMessage(response);
      onClose();
    } catch (error) {
      console.log(error);

      addMessage({
        status: "error",
        messsage: error.message || "Lỗi",
      });
      return;
    }
  };
  const handleClickInputDate = (e) => {
    e.target.showPicker();
  };
  const handleClickInputTime = (e) => {
    e.target.showPicker();
  };
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Cập nhật thông báo</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <form
          className="flex flex-col gap-4"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input
            label="Tên thông báo"
            color="gray"
            required
            onChange={handleChangeTitle}
            value={formData.title.value}
          />
          <p className="flex justify-end  text-gray-500 items-center gap-1">
            <span
              className={`${
                formData.title.value.length >= MAX_LENGTH_TITLE
                  ? "text-red-500 scale-105 duration-300"
                  : ""
              }`}
            >
              {formData.title.value.length}
            </span>
            /<span>{MAX_LENGTH_TITLE}</span>
          </p>
          <Textarea
            label="Nội dung thông báo"
            color="gray"
            required
            onChange={handleChangeContent}
            value={formData.content.value}
          />
          <p className="flex justify-end  text-gray-500 items-center gap-1">
            <span
              className={`${
                formData.content.value.length >= MAX_LENGTH_CONTENT
                  ? "text-red-500 scale-105 duration-300"
                  : ""
              }`}
            >
              {formData.content.value.length}
            </span>
            /<span>{MAX_LENGTH_CONTENT}</span>
          </p>
          <Input
            type="date"
            min={currentDate}
            label="Ngày thông báo"
            required
            value={formData.date.value}
            onClick={handleClickInputDate}
            onChange={handleChangeDate}
          />
          <Input
            type="time"
            color="gray"
            label="Thời gian thông báo"
            required
            value={formData.time.value}
            onClick={handleClickInputTime}
            onChange={handleChangeTime}
          />
          <Alert open={formData.time.error} color="red">
            {formData.time.message}
          </Alert>
        </form>
      </DialogBody>
      <DialogFooter className="flex gap-4 items-center">
        <Button color="gray" variant="text" onClick={onClose}>
          Hủy
        </Button>
        <Button
          type="submit"
          className="bg-primary-500"
          onClick={handleClickButtonSubmit}
        >
          Lưu
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalUpdateNotification;
