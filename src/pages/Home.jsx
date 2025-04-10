import { lazy, Suspense, useEffect, useState } from "react";
import {
  Input,
  Select,
  Option,
  Button,
  Tooltip,
  Dialog,
  Spinner,
  DialogBody,
} from "@material-tailwind/react";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import request from "../utils/request";
import { useJob } from "../context/jobContext";
import useDebound from "../hooks/useDebound";

const ModalCreateJob = lazy(() => import("../component/ModalCreateJob"));
const ModalUpdateJob = lazy(() => import("../component/ModalUpdateJob"));
const ModalDeleteJob = lazy(() => import("../component/ModalDeleteJob"));
const ModalViewJob = lazy(() => import("../component/ModalViewJob"));
const LoadingModal = () => (
  <Dialog open={true}>
    <DialogBody>
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </DialogBody>
  </Dialog>
);

function Home() {
  document.title = "Quản lý công việc";
  const { isLoadingJob, jobData, setJobData, setIsLoadingJob, status } =
    useJob();
  const [openModal, setOpenModal] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });
  
  const [searchValue, setSearchValue] = useState("");
  const [deboundSearch] = useDebound(searchValue, 500);
  const [sortBy, setSortBy] = useState("");
  const [data, setData] = useState({});
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleOpenModalCreate = () => {
    setOpenModal({ ...openModal, create: !openModal.create });
  };
  const handleOpenModalUpdate = () => {
    setOpenModal({ ...openModal, update: !openModal.update });
  };
  const handleOpenModalDelete = () => {
    setOpenModal({ ...openModal, delete: !openModal.delete });
  };
  const handleOpenModalView = () => {
    setOpenModal({ ...openModal, view: !openModal.view });
  };
  const handleChangeSort = (e) => {
    setSortBy(e);
  };
  const listSort = {
    DESC: {
      title: "Mới nhất",
    },
    ASC: {
      title: "Cũ nhất",
    },
    ...status,
  };

  useEffect(() => {
    (async () => {
      setIsLoadingJob(true);
      try {
        const response = await request(
          `/job${deboundSearch ? `?jobName=${deboundSearch}` : ""}`
        );
        console.log(response);

        if (response.status === "success") {
          setJobData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingJob(false);
      }
    })();
  }, [deboundSearch]);
  useEffect(() => {
    if (!sortBy || sortBy === "") return;
    (async () => {
      setIsLoadingJob(true);
      try {
        const response = await request(`/job/sort?sortBy=${sortBy}`);
        if (response.status === "success") {
          setJobData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingJob(false);
      }
    })();
  }, [sortBy]);
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center w-full h-full">
          <div className="max-w-5xl w-full">
            <div className="flex justify-between items-center px-4 py-2">
              <p className="text-xl sm:text-2xl font-bold">
                Danh sách công việc {jobData.count ? `(${jobData.count})` : ""}
              </p>
              <Tooltip content="Thêm mới công việc">
                <Button
                  className="bg-primary-500"
                  onClick={handleOpenModalCreate}
                >
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>
            <div className="flex flex-col px-4 py-2 gap-4 sm:flex-row">
              <Input
                color="gray"
                label="Tìm kiếm công việc"
                onChange={handleSearch}
              />

              <Select label="Sắp xếp" color="gray" value={sortBy} onChange={handleChangeSort}>
                {Object.entries(listSort).map(([key, value]) => (
                  <Option key={key} value={key}>
                    {value.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-4 px-4 py-2 ">
              <div className="bg-secondary-200 px-4 py-2 rounded-md flex flex-col gap-4">
                {isLoadingJob && (
                  <div className="flex justify-center items-center h-full">
                    loading... <Spinner />
                  </div>
                )}
                {!isLoadingJob && jobData.count < 1 && (
                  <p className="text-center text-red-500">
                    Không có công việc nào
                  </p>
                )}
                {!isLoadingJob &&
                  jobData.count > 0 &&
                  jobData.rows?.map((job) => {
                    return (
                      <div
                        key={job.id}
                        className="flex flex-col shadow rounded-md p-4 bg-bg hover:scale-105 duration-300 gap-4 sm:flex-row  sm:justify-between sm:items-center overflow-hidden text-secondary-500"
                      >
                        <div className="w-full sm:w-3/4 px-4 py-2 border-b-2 sm:border-r-2 sm:border-b-0 border-secondary-300">
                          <h2 className="text-secondary-950 font-bold text-2xl text-center truncate">
                            {job.jobName}
                          </h2>
                          <p className="truncate font-mono text-secondary-500 bg-secondary-50 px-4 py-2 rounded-md my-2">
                            {job.jobDescription}
                          </p>
                          <p className="my-2">
                            Trạng thái:{" "}
                            <span
                              className={`${
                                status[job.status].color
                              } px-2 py-2 rounded text-secondary-800`}
                            >
                              {status[job.status].title}
                            </span>
                          </p>
                          <p className="my-2">
                            Ngày tạo:{" "}
                            <span className="text-secondary-900">
                              {new Date(job.createdAt).toLocaleString()}
                            </span>
                          </p>
                          <p className="my-2">
                            cập nhật gần đây:{" "}
                            <span className="text-secondary-900">
                              {new Date(job.updatedAt).toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <div className="flex w-full gap-2 justify-between sm:gap-4 sm:flex-col sm:w-1/4 px-4 py-2">
                          <Tooltip content="Xóa công việc">
                            <Button
                              color="red"
                              variant="text"
                              className="flex justify-center"
                              onClick={() => {
                                setData(job);
                                handleOpenModalDelete();
                              }}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Chỉnh sửa công việc">
                            <Button
                              variant="text"
                              color="indigo"
                              className="flex justify-center"
                              onClick={() => {
                                setData(job);
                                handleOpenModalUpdate();
                              }}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Xem chi tiết công việc">
                            <Button
                              variant="text"
                              color="blue"
                              className="flex justify-center"
                              onClick={() => {
                                setData(job);
                                handleOpenModalView();
                              }}
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal.create && (
        <Suspense fallback={<LoadingModal />}>
          <ModalCreateJob
            open={openModal.create}
            onClose={handleOpenModalCreate}
          />
        </Suspense>
      )}
      {openModal.update && (
        <Suspense fallback={<LoadingModal />}>
          <ModalUpdateJob
            open={openModal.update}
            onClose={handleOpenModalUpdate}
            data={data}
          />
        </Suspense>
      )}
      {openModal.delete && (
        <Suspense fallback={<LoadingModal />}>
          <ModalDeleteJob
            open={openModal.delete}
            onClose={handleOpenModalDelete}
            data={data}
          />
        </Suspense>
      )}
      {openModal.view && (
        <Suspense fallback={<LoadingModal />}>
          <ModalViewJob
            open={openModal.view}
            onClose={handleOpenModalView}
            data={data}
          />
        </Suspense>
      )}
    </>
  );
}

export default Home;
