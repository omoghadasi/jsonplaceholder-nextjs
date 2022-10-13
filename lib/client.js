import axios from "axios";

export const req = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
