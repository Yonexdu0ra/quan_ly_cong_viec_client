import { API_URL, GRAPHQL_API_URL } from "./constant";

export const request = async (path, options) => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: options.body,
      // credentials: 'include',
      method: options.method || 'POST',
    });
    const data = await res.json();
    const refresh_token = localStorage.getItem("refresh_token");
    if (
      data.status === "error" &&
      data.message === "TokenExpiredError" &&
      refresh_token
    ) {
      const refreshRes = await fetch(`${API_URL}/refresh_token`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          refresh_token,
        }),
      });
      const refreshData = await refreshRes.json();
      if (refreshData.status === "success") {
        localStorage.setItem("access_token", refreshData.data.access_token);
        return await request(path, options);
      }
      localStorage.clear();
    }
    return data;
  } catch (error) {
    return { status: "error", message: error.message, data: null };
  }
};

export const graphQLRequest = async (payload, options = { method: "POST" }) => {
  try {
    const res = await fetch(GRAPHQL_API_URL, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        ...options,
      },
      method: options.method,
      body: JSON.stringify(payload),
      //   credentials: "include",
    });
    const data = await res.json();
    const refresh_token = localStorage.getItem("refresh_token");
    if (
      data.status === "error" &&
      data.message === "TokenExpiredError" &&
      refresh_token
    ) {
      const refreshRes = await fetch(`${API_URL}/refresh_token`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          refresh_token,
        }),
      });
      const refreshData = await refreshRes.json();
      if (refreshData.status === "success") {
        localStorage.setItem("access_token", refreshData.data.access_token);
        return await graphQLRequest(payload, options);
      }
      localStorage.clear();
    }
    return data;
  } catch (error) {
    return { status: "error", message: error.message, data: null };
  }
};
