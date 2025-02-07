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
} from "@material-tailwind/react";
import useResize from "../hooks/useResize";

import { useJob } from "../context/jobContext";
function ModalViewJob({ open, onClose, data }) {
  const { status } = useJob();

  const { width } = useResize();
  const isMobile = width < 768;
  const size = isMobile ? "xxl" : "md";
  return (
    <Dialog open={open} size={size} className="max-w-xl">
      <DialogHeader>
        <h2 className="text-xl font-bold">Thông tin công việc</h2>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          <Input
            color="gray"
            label="Tên công việc"
            value={data?.jobName}
            readOnly
          />

          <Textarea
            label="Mô tả công việc"
            color="gray"
            value={data?.jobDescription}
            readOnly
            rows={20}
          />

          {/* <Select label="Trạng thái" value={data?.status} color="gray">
            <Option value={data?.status}>{status[data?.status]?.title}</Option>
          </Select> */}
          <Input label="Trạng thái" value={status[data?.status]?.title || ''} readOnly/>
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

export default ModalViewJob;
