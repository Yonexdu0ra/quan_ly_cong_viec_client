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
// import { useJob } from "../context/jobContext";
import useDebound from "../hooks/useDebound";
import { useSchedule } from "../context/scheduleContext";
import { use } from "react";
// import ModalDeleteNotification from "../component/ModalDeleteNotification";

const ModalCreateNotification = lazy(() =>
  import("../component/ModalCreateNotification")
);
const ModalUpdateNotification = lazy(() =>
  import("../component/ModalUpdateNotification")
);
const ModalDeleteNotification = lazy(() =>
  import("../component/ModalDeleteNotification")
);
const ModalViewNotification = lazy(() =>
  import("../component/ModalViewNotification")
);
const LoadingModal = () => (
  <Dialog open={true}>
    <DialogBody>
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </DialogBody>
  </Dialog>
);

function NotificationManager() {
  document.title = "Quản lý thông báo";
  const {
    isLoadingSchedule,
    setIsLoadingSchedule,
    scheduleData,
    setScheduleData,
  } = useSchedule();
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });

  const [searchValue, setSearchValue] = useState("");
  const [deboundSearch] = useDebound(searchValue, 500);
  const [sortBy, setSortBy] = useState("");
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
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoadingSchedule(true);
      try {
        const response = await request(`/schedule${deboundSearch ? '?title=' + deboundSearch : ''}`);
        if (response.status === "success") {
          setScheduleData(response.data);
        }
      } catch (error) {
        return;
      } finally {
        setIsLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, [deboundSearch]);
  useEffect(() => {
    if (sortBy === "") return;
    const fetchSchedule = async () => {
      setIsLoadingSchedule(true);
      try {
        const response = await request(`/schedule/sort?sortBy=${sortBy}`);
        if (response.status === "success") {
          setScheduleData(response.data);
        }
      } catch (error) {
        return;
      } finally {
        setIsLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, [sortBy]);
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center w-full h-full">
          <div className="max-w-5xl w-full">
            <div className="flex justify-between items-center px-4 py-2">
              <p className="text-xl sm:text-2xl font-bold">
                Danh sách thông báo ({scheduleData.count})
              </p>
              <Tooltip content="Thêm mới thông báo">
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
                label="Tìm kiếm thông báo"
                onChange={handleSearch}
              />
              <Select color="gray" value={sortBy} label="Sắp xếp" onChange={handleChangeSort}>
                <Option value="DESC">Mới nhất</Option>
                <Option value="ASC">Cũ nhất</Option>
                <Option value="true">Đã gửi</Option>
                <Option value="false">Chưa gửi</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-4 px-4 py-2 ">
              <div className="bg-secondary-200 px-4 py-2 rounded-md flex flex-col gap-4">
                {isLoadingSchedule && (
                  <div className="flex justify-center items-center h-full">
                    loading... <Spinner />
                  </div>
                )}
                {!isLoadingSchedule && scheduleData.count < 1 && (
                  <p className="text-center text-red-500">
                    Không có công việc nào
                  </p>
                )}

                {!isLoadingSchedule &&
                  scheduleData.count > 0 &&
                  scheduleData.rows?.map((schedule) => {
                    return (
                      <div
                        key={schedule.id}
                        className="flex flex-col shadow rounded-md p-4 bg-bg hover:scale-105 duration-300 gap-4 sm:flex-row  sm:justify-between sm:items-center overflow-hidden"
                      >
                        <div className="w-full sm:w-3/4 px-4 py-2 border-b-2 sm:border-r-2 sm:border-b-0 border-secondary-300 text-secondary-500">
                          <h2 className="text-secondary-950 font-bold text-2xl text-center truncate">
                            {schedule.title}
                          </h2>
                          <p className="truncate font-mono text-secondary-500 bg-secondary-50 px-4 py-2 rounded-md">
                            {schedule.content}
                          </p>
                          <p>
                            Trạng thái:{" "}
                            <span>
                              {schedule.status ? (
                                <span className="text-green-500 font-bold">
                                  Đã gửi
                                </span>
                              ) : (
                                <span className="text-red-500  font-bold">
                                  Chưa gửi
                                </span>
                              )}
                            </span>
                          </p>
                          <p>
                            Ngày tạo:{" "}
                            <span className="text-secondary-900">
                              {new Date(schedule.createdAt).toLocaleString()}
                            </span>
                          </p>
                          <p>
                            cập nhật gần đây:{" "}
                            <span className="text-secondary-900">
                              {new Date(schedule.updatedAt).toLocaleString()}
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
                                setData(schedule);
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
                                setData(schedule);
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
                                setData(schedule);
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

                {/* <div className="flex flex-col shadow rounded-md p-4 bg-bg hover:scale-105 duration-300 gap-4 sm:flex-row  sm:justify-between sm:items-center overflow-hidden">
                  <div className="w-full sm:w-3/4 px-4 py-2 border-b-2 sm:border-r-2 sm:border-b-0 border-secondary-300">
                    <h2 className="text-secondary-950 font-bold text-2xl text-center truncate">
                      Tiêu đề
                    </h2>
                    <p className="truncate font-mono text-secondary-500">
                      nội dung
                    </p>
                    <p>
                      Trạng thái: <span className="text-secondary-500"></span>
                    </p>
                    <p>Ngày tạo: </p>
                    <p>cập nhật gần đây: </p>
                  </div>
                  <div className="flex w-full gap-2 justify-between sm:gap-4 sm:flex-col sm:w-1/4 px-4 py-2">
                    <Tooltip content="Xóa thông báo">
                      <Button
                        color="red"
                        variant="text"
                        className="flex justify-center"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Chỉnh sửa thông báo">
                      <Button
                        variant="text"
                        color="indigo"
                        className="flex justify-center"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Xem chi tiết thông báo">
                      <Button
                        variant="text"
                        color="blue"
                        className="flex justify-center"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal.create && (
        <Suspense fallback={<LoadingModal />}>
          <ModalCreateNotification
            open={openModal.create}
            onClose={handleOpenModalCreate}
          />
        </Suspense>
      )}
      {openModal.update && (
        <Suspense fallback={<LoadingModal />}>
          <ModalUpdateNotification
            open={openModal.update}
            onClose={handleOpenModalUpdate}
            data={data}
          />
        </Suspense>
      )}
      {openModal.delete && (
        <Suspense fallback={<LoadingModal />}>
          <ModalDeleteNotification
            open={openModal.delete}
            onClose={handleOpenModalDelete}
            data={data}
          />
        </Suspense>
      )}
      {openModal.view && (
        <Suspense fallback={<LoadingModal />}>
          <ModalViewNotification
            open={openModal.view}
            onClose={handleOpenModalView}
            data={data}
          />
        </Suspense>
      )}
    </>
  );
}

export default NotificationManager;
