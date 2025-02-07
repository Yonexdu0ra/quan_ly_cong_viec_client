import { createContext, useContext, useEffect, useState } from "react";
// import {  request } from "../utils/request";
export const scheduleContext = createContext({});

const ScheduleProvider = ({ children }) => {
  const [scheduleData, setScheduleData] = useState({});
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);

  return (
    <scheduleContext.Provider value={{
        scheduleData,
        setScheduleData,
        isLoadingSchedule,
        setIsLoadingSchedule,
    }}>{children}</scheduleContext.Provider>
  );
};

export const useSchedule = () => {
  return useContext(scheduleContext);
};
export default ScheduleProvider;
