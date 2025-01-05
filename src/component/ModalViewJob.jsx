import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { graphQLRequest } from "../utils/request";
import { jobContext } from "../context/JobContext";
function ModelViewJob({ handleOpen, open, job }) {
  


  const { status } = useContext(jobContext);
  const isUpdate = job.createdAt !== job.updatedAt;
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <div className="flex flex-col bg-layer p-10 gap-5 text-white rounded-md">
        <h1 className="text-3xl sm:text-4xl font-mono">Thêm công việc</h1>
        <Input
          label="Tên công việc"
          color="white"
          readOnly
          value={job.jobName}
        />
        <Textarea
          rows={10}
          color="white"
          placeholder="Nội dung công việc"
          // resize={true}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          readOnly
          value={job.jobDescription}
        />
        <p className="flex flex-wrap gap-x-2 items-center">
          Trạng thái:
          <span className={`${status[job.status].color} px-2 py-1 rounded-md`}>
            {status[job.status].title}
          </span>
        </p>
        <p className="flex flex-wrap gap-x-2">
          Ngày tạo: <span>{new Date(job.createdAt).toLocaleString()}</span>
        </p>
       
        {isUpdate && (
          <p className="flex flex-wrap gap-x-2">
            Cập nhật gần đây:
            <span>{new Date(job.updatedAt).toLocaleString()}</span>
          </p>
        )}
        <div className="flex justify-end gap-4">
          <Button variant="filled" color="green" onClick={handleOpen}>
            Đóng
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ModelViewJob;
