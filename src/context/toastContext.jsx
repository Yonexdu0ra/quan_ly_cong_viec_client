import { createContext, useContext, useEffect, useRef, useState } from "react";

export const toastContext = createContext();

const ToastContext = ({ children }) => {
  const [messages, setMessages] = useState([
    // {
    //   status: "info",
    //   message: "Chào mừng bạn đến với hệ thống quản lý công việc",
    // },
  ]); // Quản lý danh sách các message
  const messageContainerRef = useRef(null);

  // Hàm thêm thông báo mới
  const addMessage = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  // Hàm xoá thông báo theo index
  const removeMessage = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  // Tự động xóa thông báo sau 10 giây
  useEffect(() => {
    if (messages.length === 0) return;

    const timer = setTimeout(() => {
      setMessages((prev) => prev.slice(1)); // Xóa thông báo đầu tiên
    }, 6000);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <toastContext.Provider
      value={{
        addMessage,
        removeMessage,
      }}
    >
      {children}
      <div
        ref={messageContainerRef}
        id='toast-container'
        className="absolute bottom-10 right-10 md:right-12 max-w-80 sm:max-w-sm md:max-w-md w-full flex flex-col gap-4 z-[1000]"
      >
        {messages.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded shadow-lg transition-all duration-300 animate-show-toast
              ${
                item.status === "success"
                  ? "bg-green-100"
                  : item.status === "error"
                  ? "bg-red-100"
                  : "bg-[#9bb8e8]"
              }`}
          >
            <div>
              <p className="font-bold capitalize">
                {item.status === "success"
                  ? "Thành công"
                  : item.status === "error"
                  ? "Lỗi"
                  : "Thông báo"}
              </p>
              <p className="toast-message">{item.message}</p>
            </div>
            <button
              className="text-gray-500 hover:text-black ml-4"
              onClick={() => removeMessage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </toastContext.Provider>
  );
};
export const useToast = () => useContext(toastContext);

export default ToastContext;
