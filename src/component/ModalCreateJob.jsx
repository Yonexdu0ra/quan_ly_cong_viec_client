import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import useResize from "../hooks/useResize";
import { useRef, useState } from "react";
import { useJob } from "../context/jobContext";
import request from "../utils/request";
import { useToast } from "../context/toastContext";
function ModalCreateJob({ open, onClose }) {
  const { status, setJobData } = useJob();
  const { addMessage } = useToast();
  const [formData, setFormData] = useState({
    jobName: "",
    jobDescription: "",
    status: "",
  });

  const [errorSelect, setErrorSelect] = useState({
    error: false,
    message: "",
  });
  const MAX_LENGTH_JOBNAME = 200;
  const MAX_LENGTH_JOBDESCRIPTION = 1000;
  const listStatus = Object.entries(status).map(([key, value]) => ({
    value: key,
    title: value.title,
  }));
  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  const buttonRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) {
      setErrorSelect({
        error: true,
        message: "Vui lòng chọn trạng thái",
      });
      return;
    }
    try {
      const response = await request("/job", {
        method: "POST",
        body: formData,
      });
      if (response.status === "success") {
        setJobData((prev) => ({
          count: prev.count + 1,
          rows: [response.data, ...prev.rows],
        }));
      }
      addMessage(response);
      onClose();
    } catch (error) {
      addMessage({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra vui lòng thử lại sau.",
      });
      console.log(error);
    }
  };
  const handleClicked = () => {
    if (buttonRef?.current) {
      buttonRef?.current?.requestSubmit();
    }
  };
  const handleChangeStatus = (value) => {
    setErrorSelect({
      error: false,
      message: "",
    });
    setFormData({
      ...formData,
      status: value,
    });
  };
  const handleChangeJobName = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      jobName: value,
    });
    // if (value.length > MAX_LENGTH_JOBNAME) return;
  };
  const handleChangeJobDescription = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      jobDescription: value,
    });
    // if (value.length > MAX_LENGTH_JOBDESCRIPTION) return;
  };
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Thêm công việc mới</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          ref={buttonRef}
        >
          <Input
            color="gray"
            label="Tên công việc"
            required
            onChange={handleChangeJobName}
            value={formData.jobName}
          />
          <p className="flex items-center">
            <span
              className={`${
                formData.jobName.length >= MAX_LENGTH_JOBNAME
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formData.jobName.length}
            </span>
            /<span>{MAX_LENGTH_JOBNAME} ký tự</span>
          </p>
          <Textarea
            label="Mô tả công việc"
            color="gray"
            required
            onChange={handleChangeJobDescription}
            value={formData.jobDescription}
            rows={12}
          />
          <p className="flex items-center">
            <span
              className={`${
                formData.jobDescription.length >= MAX_LENGTH_JOBDESCRIPTION
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formData.jobDescription.length}
            </span>
            /<span>{MAX_LENGTH_JOBDESCRIPTION} ký tự</span>
          </p>

          <Select label="Trạng thái" color="gray" onChange={handleChangeStatus}>
            {listStatus.map((status) => (
              <Option key={status.value} value={status.value}>
                {status.title}
              </Option>
            ))}
          </Select>
          <Alert open={errorSelect.error} color="red">
            {errorSelect.message}
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
          onClick={handleClicked}
        >
          Lưu
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalCreateJob;
