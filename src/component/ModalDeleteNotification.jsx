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
import { useToast } from "../context/toastContext";
import request from "../utils/request";
import { useSchedule } from "../context/scheduleContext";
function ModalDeleteNotification({ open, onClose, data }) {
  const { setScheduleData } = useSchedule();
  const { addMessage } = useToast();
  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  const handleDeleteJob = async (e) => {
    try {
      const response = await request("/schedule" + "/" + data.id, {
        method: "DELETE",
      });
      if (response.status === "success") {
        setScheduleData((prev) => ({
          count: prev.count - 1,
          rows: prev.rows.filter((row) => row.id !== data.id),
        }));
      }
      addMessage(response);
      onClose();
    } catch (error) {
      addMessage({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra vui lòng thử lại sau.",
      });
    }
  };
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Xóa thông báo</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <h2 className="text-2xl text-center">
          Bạn có chắc chắn là muốn xóa thông báo này?
        </h2>
      </DialogBody>
      <DialogFooter className="flex gap-4 items-center">
        <Button color="gray" variant="text" onClick={onClose}>
          Hủy
        </Button>
        <Button
          type="submit"
          // className="bg-primary-500"
          color="red"
          onClick={handleDeleteJob}
        >
          Xác nhận
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalDeleteNotification;
