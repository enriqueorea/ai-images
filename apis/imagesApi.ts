import axios from "axios";

const imagesApi = axios.create({
  baseURL: "/api/v1",
});

export default imagesApi;
