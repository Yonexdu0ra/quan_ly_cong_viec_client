import { API_URL } from "./constants";

async function request(
  path = "",
  options = {
    method: "GET",
    body: null,
  }
) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : null,
    });
    const data = await res.json();
    const refresh_token = localStorage.getItem("refresh_token");
    if (
      res.status === 401 &&
      data.message === "TokenExpiredError" &&
      refresh_token
    ) {
      const refreshRes = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      });

      if (refreshRes.ok) {
        const { data } = await refreshRes.json();
        localStorage.setItem("access_token", data.access_token || "");
        // Retry the original request with the new token
        return request(path, options);
      } else {
        localStorage.clear();
        return {
          status: "error",
          message: "Phiên bản hết hạn, vui lòng đăng nhập lại",
        };
      }
    }

    return data;
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau",
    };
  }
}

export default request;
