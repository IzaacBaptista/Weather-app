import axios from "axios";

const api = axios.create({
  baseURL: "https://on5taoyhke.execute-api.us-east-1.amazonaws.com/dev",
});

export default api;
