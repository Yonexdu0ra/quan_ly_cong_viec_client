import { createContext, useContext, useEffect, useState } from "react";
// import {  request } from "../utils/request";
export const jobContext = createContext({});

const JobProvider = ({ children }) => {
  const [jobData, setJobData] = useState([]);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  
  const status = {
    PENDING: {
      title: "Chưa thực hiện",
      color: "bg-[#e89b9b]",
    },
    ONGOING: {
      title: "Đang thực hiện",
      color: "bg-[#9bb8e8]",
    },
    COMPLETED: {
      title: "Đã thực hiện",
      color: "bg-[#9be8b8]",
    },
  };
 

  return (
    <jobContext.Provider
      value={{
        jobData,
        setJobData,
        status,
        isLoadingJob,
        setIsLoadingJob,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};

export const useJob = () => {
  return useContext(jobContext);
};
export default JobProvider;
