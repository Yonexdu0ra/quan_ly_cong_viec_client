import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { graphQLRequest, request } from "../utils/request";
import { jobContext } from "../context/JobContext";
function ModalDeleteJob({ handleOpen, open, job }) {
  const { setJobData } = useContext(jobContext);
  const [disabled, setDisabled] = useState(false);
  const handleDeleteJob = async () => {
    try {
      setDisabled(true);
      //       const query = `mutation Mutation($id: String) {
      //   deleteJob(id: $id) {
      //     id
      //     jobName
      //     jobDescription
      //     status
      //     userId
      //     createdAt
      //     updatedAt
      //   }
      // }`;
      //       const variables = {
      //         id: job.id,
      //       }
      //         const response = await graphQLRequest({ query, variables });
      //         if (response.data && response.data.deleteJob) {
      //             setJobData((cur) => cur.filter((item) => item.id !== response.data.deleteJob.id));
      //             handleOpen();
      //         }

      const { status, message } = await request(`/job/${job.id}`, {
        method: "DELETE",
        body: null,
      });
      if(status === "success") {
        setJobData((cur) => ({
          ...cur,
          count: cur.count - 1,
          rows: cur.rows.filter((item) => item.id !== job.id),
        }));
        // handleOpen();
      }
      handleOpen();
      alert(message);
    } catch (error) {
      alert("Có lỗi xảy ra");
      handleOpen();
      console.log(error);
      return
    }
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <div className="flex flex-col bg-layer p-10 gap-5 text-white rounded-md">
        <h1 className="text-3xl sm:text-4xl font-mono">Xóa công việc</h1>
        <p>Bạn có chắc chắn là muốn xóa công việc này không?</p>
        <div className="flex justify-end gap-4">
          <Button variant="text" color="red" onClick={handleOpen}>
            Hủy
          </Button>
          <Button
            variant="filled"
            color="green"
            disabled={disabled}
            loading={disabled}
            onClick={handleDeleteJob}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalDeleteJob;
