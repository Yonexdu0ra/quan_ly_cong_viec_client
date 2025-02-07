import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Alert,
  Typography,
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
function ModalViewNotification({ open, onClose, data }) {
  const { addMessage } = useToast();
  const { setScheduleData } = useSchedule();
  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Thông tin lịch nhắc nhở</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          <Input
            label="Tên thông báo"
            color="gray"
            required
            readOnly
            value={data.title}
          />

          <Textarea
            label="Nội dung thông báo"
            color="gray"
            readOnly
            value={data.content}
          />
          <Typography className="flex items-center gap-4">
            Trạng thái:{" "}
            {data.status ? (
              <span className="text-green-500 font-bold">Đã gửi</span>
            ) : (
              <span className="text-red-500 font-bold">Chưa gửi</span>
            )}
          </Typography>
          <Input
            type="date"
            label="Ngày thông báo"
            readOnly
            value={formatDateForInput(new Date(data.date))}
          />
          <Input
            type="time"
            color="gray"
            label="Thời gian thông báo"
            readOnly
            value={data.time.split(":").slice(0, 2).join(":")}
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-4 items-center">
        <Button className="bg-primary-500" onClick={onClose}>
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalViewNotification;
