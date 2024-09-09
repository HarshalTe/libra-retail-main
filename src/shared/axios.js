import axios from "axios";

const instance = axios.create({
  baseURL: "https://lvpl.in/librabackend/public/api/",
  // baseURL: "https://uditsolutions.in/librabackend/public/api/",
});

export default instance;
