import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { request } from "../utils/request";
import { jobContext } from "../context/JobContext";
function ModalCreateJob({ handleOpen, open }) {
  const [data, setData] = useState({
    jobName: "",
    jobDescription: "",
  });
  const [disabled, setDisabled] = useState(false);
  const { jobData, setJobData } = useContext(jobContext);

  const handleChangeNameJob = (e) => {
    setData({ ...data, jobName: e.target.value });
  };
  const handleChangeDescriptionJob = (e) => {
    setData({ ...data, jobDescription: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      setDisabled(true);

      const {
        status,
        message,
        data: response,
      } = await request("/job", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (status === "success") {
        setJobData({
          ...jobData,
          count: jobData.count + 1,
          rows: [response, ...jobData.rows],
        });
      }
      handleOpen();
      alert(message);
    } catch (error) {
      console.log(error);
      alert("Có lỗi xảy ra");
      handleOpen();
      return;
    }
  };
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
          readOnly={disabled}
          onChange={handleChangeNameJob}
        />
        <Textarea
          readOnly={disabled}
          rows={12}
          color="white"
          placeholder="Nội dung công việc"
          resize={true}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={handleChangeDescriptionJob}
        />
        <div className="flex justify-end gap-4">
          <Button variant="text" color="white" onClick={handleOpen}>
            hủy
          </Button>
          <Button
            className="bg-primary-600 text-primary-50"
            disabled={disabled}
            onClick={handleSubmit}
            loading={disabled}
          >
            Tạo
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalCreateJob;
