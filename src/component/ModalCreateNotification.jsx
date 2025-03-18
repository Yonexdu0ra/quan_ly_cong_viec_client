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
function ModalCreateNotification({ open, onClose }) {
  const { addMessage } = useToast();
  const { setScheduleData } = useSchedule();
  // const [date, setDate] = useState(new Date());
  const date = useRef(new Date());
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
      value: "",
    },
    content: {
      error: false,
      message: "",
      value: "",
    },
    date: {
      error: false,
      message: "",
      value: currentDate,
    },
    time: {
      error: false,
      message: "",
      value: currentTime,
    },
  });
  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH_TITLE) {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          error: true,
          message: "Tên thông báo không được quá 255 ký tự",
          value
        },
      })
      return;
    }
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        error: false,
        message: "",
        value,
      },
    });
  };
  const handleChangeContent = (e) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH_CONTENT) {

      setFormData({
        ...formData,
        content: {
          ...formData.content,
          error: true,
          message: "Nội dung thông báo không được quá 1000 ký tự",
          value,
        },
      });

      return
    };
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        error: false,
        message: "",
        value,
      },
    });
  };
  const handleChangeDate = (e) => {
    const value = e.target.value;
    // console.log();
    
    const [year, month, day] = value.split("-");
    date.current.setFullYear(year);
    date.current.setMonth(parseInt(month) - 1);
    date.current.setDate(day);
    
    console.log(date.current < new Date().setHours(0, 0, 0, 0));
    

    if (date.current < new Date().setHours(0, 0, 0, 0)) {
      setFormData({
        ...formData,
        date: {
          ...formData.date,
          value,
          error: true,
          message: "Ngày không hợp lệ",
        },
      });
      return;
    }

    setFormData({
      ...formData,
      date: {
        ...formData.date,
        error: false,
        message: "",
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
      const response = await request("/schedule", {
        method: "POST",
        body: {
          // title: formData.title.value,
          content: formData.content.value,
          date: formData.date.value,
          time: formData.time.value,
        },
      });

      if (response.status === "success") {
        setScheduleData((prevData) => {
          console.log(prevData);

          return {
            ...prevData,
            count: prevData.count + 1,
            rows: [response.data, ...prevData.rows],
          };
        });
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
    // e.target.showPicker();
  };
  const handleClickInputTime = (e) => {
    // e.target.showPicker();
  };
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Thêm mới lịch nhắc nhở</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <form
          className="flex flex-col gap-4"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {/* <Input
            label="Tên thông báo"
            color="gray"
            required
            onChange={handleChangeTitle}
            value={formData.title.value}
          /> */}
          {/* <p className="flex justify-end  text-gray-500 items-center gap-1">
            <span
              className={`${
                formData.title.value.length >= MAX_LENGTH_TITLE
                  ? "text-red-500 scale-105 duration-300"
                  : ""
              }`}
            >
              {formData.title.value.length}
            </span>
            /<span>{MAX_LENGTH_TITLE}</span> */}
          {/* </p> */}
          {/* <Alert open={formData.title.error} color="red">
            {formData.title.message}
          </Alert> */}
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
          <Alert open={formData.content.error} color="red">
            {formData.content.message}
          </Alert>
          <Input
            type="date"
            min={currentDate}
            label="Ngày thông báo"
            required
            // onClick={handleClickInputDate}
            onChange={handleChangeDate}
          />
          <Alert open={formData.date.error} color="red">
            {formData.date.message}
          </Alert>
          <Input
            type="time"
            color="gray"
            label="Thời gian thông báo"
            required
            // onClick={handleClickInputTime}
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

export default ModalCreateNotification;
