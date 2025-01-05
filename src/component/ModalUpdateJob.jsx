import {
  Button,
  Dialog,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { graphQLRequest, request } from "../utils/request";
import { jobContext } from "../context/JobContext";
function ModalUpdateJob({ handleOpen, open, job }) {
  const { status, setJobData } = useContext(jobContext);
  const [data, setData] = useState(job);
  const [disabled, setDisabled] = useState(false);

  const handleChangeJobName = (e) => {
    setData((cur) => ({ ...cur, jobName: e.target.value }));
  };
  const handleChangeJobDescription = (e) => {
    setData((cur) => ({ ...cur, jobDescription: e.target.value }));
  };
  const handleChangeStatus = (value) => {
    setData((cur) => ({ ...cur, status: value }));
  };

  const handleUpdateJob = async () => {
    try {
      setDisabled(true);
      //       const query = `
      //         mutation Mutation($updateJobId: String, $jobName: String, $jobDescription: String, $status: String) {
      //   updateJob(id: $updateJobId, jobName: $jobName, jobDescription: $jobDescription, status: $status) {
      //     id
      //     jobName
      //     jobDescription
      //     status
      //     userId
      //     createdAt
      //     updatedAt
      //   }
      // }

      // `;
      //       const variables = {
      //         updateJobId: data.id,
      //         jobName: data.jobName,
      //         jobDescription: data.jobDescription,
      //         status: data.status,
      //       };
      //       const response = await graphQLRequest({ query, variables });

      //       if (response?.data?.updateJob) {
      //         setJobData((cur) =>
      //           cur.map((item) =>
      //             item.id === data.id ? response.data.updateJob : item
      //           )
      //         );
      //       }

      const {
        status,
        message,
        data: response,
      } = await request(`/job/${job.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (status === "success") {
        setJobData((cur) => ({
          ...cur,
          rows: cur.rows.map((item) => item.id === response.id ? response : item)
        }));
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
          onChange={handleChangeJobName}
          value={data.jobName}
          readOnly={disabled}
        />
        <Textarea
          rows={10}
          color="white"
          placeholder="Nội dung công việc"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={handleChangeJobDescription}
          value={data.jobDescription}
          readOnly={disabled}
        />
        <Select
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={data.status}
          onChange={handleChangeStatus}
          className="bg-white"
        >
          {Object.entries(status)?.map((item) => (
            <Option key={item[0]} value={item[0]}>
              {item[1].title}
            </Option>
          ))}
        </Select>

        <div className="flex justify-end gap-4">
          <Button variant="text" color="red" onClick={handleOpen}>
            Hủy
          </Button>
          <Button
            variant="filled"
            color="green"
            onClick={handleUpdateJob}
            loading={disabled}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalUpdateJob;
