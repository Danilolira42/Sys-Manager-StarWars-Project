import axios from "axios";
import { url } from "../config/config.jsx";

export const https = axios.create ({
    baseURL: url.api
})