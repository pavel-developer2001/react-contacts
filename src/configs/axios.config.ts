import axios from "axios";
import { API_URL } from "../constans";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
