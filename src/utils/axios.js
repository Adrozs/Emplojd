import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://localhost:54687",
});

export default customFetch;
