import {
  Button,
  Input,
  Select,
  Spinner,
  Option,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import ModalCreateJob from "../component/ModalCreateJob";
import ModalViewJob from "../component/ModalViewJob";
import { jobContext } from "../context/JobContext";
import ModalDeleteJob from "../component/ModalDeleteJob";
import ModalUpdateJob from "../component/ModalUpdateJob";
import useDebounce from "../hooks/useDebound";
import { request } from "../utils/request";
function Home() {
  const { jobData, setJobData, loadingJob, status, setLoadingJob } =
    useContext(jobContext);
  // console.log(jobData);

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDeleteJob, setOpenDeleteJob] = useState(false);
  const [openUpdateJob, setOpenUpdateJob] = useState(false);
  const [sortBy, setSortBy] = useState("DESC");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchTerm, isLoading] = useDebounce(searchValue, 500);
  const [job, setJob] = useState({});
  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpenView = () => setOpenView((cur) => !cur);
  const handleOpenDeleteJob = () => setOpenDeleteJob((cur) => !cur);
  const handleOpenUpdateJob = () => setOpenUpdateJob((cur) => !cur);
  const handleSearchJob = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingJob(true);
      try {
        

        const response = await request(
          `/job?${debouncedSearchTerm ? `jobName=${debouncedSearchTerm}` : ""}`,
          {
            method: "GET",
            body: null,
          }
        );
        // let querySelect = "";
        // if (["DESC", "ASC"].includes(sortBy)) {
        //   querySelect = `order=${sortBy}`;
        // } else {
        //   querySelect = `status=${sortBy}`;
        // }

        // const response = await request(
        //   `/job?${debouncedSearchTerm ? `jobName=${debouncedSearchTerm}` : ""}${
        //     sortBy === "DESC" ? "" : "&" + querySelect
        //   }`,
        //   {
        //     method: "GET",
        //     body: null,
        //   }
        // );

        setJobData(response.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingJob(true);
      try {
        
        const response = await request(
          `/job/sort?sortBy=${sortBy}`,
          {
            method: "GET",
            body: null,
          }
        );

        setJobData(response.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchData();
  }, [ sortBy]);

  // if (loadingJob) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex h-full justify-center">
        <div className="flex flex-col w-full sm:max-w-4xl mx-auto p-5 gap-5">
          <div className="flex justify-between">
            <h1 className="text-xl sm:text-4xl">Danh sách các công việc {jobData.count || ''}</h1>
            <Button
              className="bg-primary-600 text-primary-50"
              onClick={handleOpen}
              disabled={loadingJob || isLoading}
            >
              Thêm mới
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Input
              label="Tìm kiếm công việc theo tên"
              color="white"
              value={searchValue}
              onChange={handleSearchJob}
            />
            <Select
              value={sortBy}
              onChange={handleSort}
              className="bg-white"
              placeholder={"Sắp xếp theo"}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            >
              <Option value="DESC">Mới nhất</Option>
              <Option value="ASC">Cũ nhất</Option>
              <Option value="PENDING">Chưa thực hiện</Option>
              <Option value="ONGOING">Đang thực hiện</Option>
              <Option value="COMPLETED">Đã thực hiện</Option>
            </Select>
          </div>
          <div className="flex flex-col gap-5 py-2 h-full overflow-y-auto ">
            {jobData?.count === 0 && (
              <p className="text-2xl text-error">
                Không tìm thấy công việc nào
              </p>
            )}
            {isLoading || loadingJob ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              jobData?.rows?.map((item) => {
                const hiddenTitle =
                  item.jobName.length > 50
                    ? item.jobName.slice(0, 50) + "..."
                    : item.jobName;
                const hiddenContent =
                  item.jobDescription.length > 50
                    ? item.jobDescription.slice(0, 50) + "..."
                    : item.jobDescription;
                const isUpdate = item.createdAt !== item.updatedAt;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row bg-layer p-5 gap-2 rounded-md"
                  >
                    <div className="flex flex-col w-9/12">
                      <h4 className="text-lg sm:text-xl flex flex-wrap gap-x-2">
                        Tên công việc: <span>{hiddenTitle}</span>
                      </h4>
                      <p className="font-mono flex flex-wrap gap-x-2">
                        Nội dung: <span>{hiddenContent}</span>
                      </p>
                      <p className="flex flex-wrap gap-x-2">
                        Trạng thái:
                        <span
                          className={`${
                            status[item.status].color
                          } px-2 py-1 rounded-md`}
                        >
                          {status[item.status].title}
                        </span>
                      </p>
                      <p className="flex flex-wrap gap-x-2">
                        Ngày tạo:{" "}
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
                      </p>
                      {isUpdate && (
                        <p className="flex flex-wrap gap-x-2">
                          Cập nhật gần đây:
                          <span>
                            {new Date(item.updatedAt).toLocaleString()}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="w-full sm:w-5/12 flex justify-center md:justify-between items-center">
                      <Button
                        variant="text"
                        color="red"
                        // className="hover:text-red-500"
                        onClick={() => {
                          setJob(item);
                          handleOpenDeleteJob();
                        }}
                      >
                        Xóa
                      </Button>
                      <Button
                        variant="text"
                        color="yellow"
                        onClick={() => {
                          setJob(item);
                          handleOpenUpdateJob();
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="filled"
                        color="green"
                        onClick={() => {
                          console.log(item);

                          setJob(item);
                          handleOpenView();
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {open && <ModalCreateJob handleOpen={handleOpen} open={open} />}
      {openView && (
        <ModalViewJob handleOpen={handleOpenView} open={openView} job={job} />
      )}
      {openDeleteJob && (
        <ModalDeleteJob
          handleOpen={handleOpenDeleteJob}
          open={openDeleteJob}
          job={job}
        />
      )}
      {openUpdateJob && (
        <ModalUpdateJob
          handleOpen={handleOpenUpdateJob}
          open={openUpdateJob}
          job={job}
        />
      )}
    </>
  );
}

export default Home;
