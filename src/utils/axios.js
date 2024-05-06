import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://localhost:54686",
});

export default customFetch;
