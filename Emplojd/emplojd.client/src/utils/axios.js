import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://emplojdserver20240531231628.azurewebsites.net/",
});

export default customFetch;
