import axios from "axios";

const BASE_URL = process.env.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "cache-control": "no-cache",
  },
});

export const isServerUp = async () => {
  let serverUp: boolean = false;

  try {
    const result = await axiosInstance({
      url: BASE_URL + "/status",
      method: "GET",
      data: {},
    });

    if (result.status == 200) serverUp = true;

    console.log(`SERVER UP [BASE_URL: ${BASE_URL}]`);

    return serverUp;
  } catch (err) {
    console.log(
      `${err.message.toUpperCase()}: SERVER DOWN [BASE_URL: ${BASE_URL}]`
    );
    return serverUp;
  }
};
