import { createContext, useEffect, useState } from "react";
import {  request } from "../utils/request";
export const jobContext = createContext({});

const JobProvider = ({ children }) => {
  const [jobData, setJobData] = useState([]);
  const [loadingJob, setLoadingJob] = useState(true);
  
  const status = {
    PENDING: {
      title: "Chưa thực hiện",
      color: "bg-red-500",
    },
    ONGOING: {
      title: "Đang thực hiện",
      color: "bg-yellow-800",
    },
    COMPLETED: {
      title: "Đã thực hiện",
      color: "bg-green-500",
    },
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await request('/job', { method: 'GET' });
  //       if (response.data) {
  //         setJobData(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       return;
  //     } finally {
  //       setLoadingJob(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <jobContext.Provider
      value={{
        jobData,
        loadingJob,
        setJobData,
        setLoadingJob,
        status,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};

export default JobProvider;
