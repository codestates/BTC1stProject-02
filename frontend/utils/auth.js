import axios from "axios";

export const login = async (address, password) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`,
    {
      address,
      password,
    },
    { withCredentials: true }
  );

  if (data?.accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// 서버가 express인 경우
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
