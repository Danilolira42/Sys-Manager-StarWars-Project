import axios from "axios";
import { url } from "../config/Config";

export const Https = axios.create ({
    baseURL: url.api
})

export const HttpsProxy = axios.create ({
    baseURL: url.proxy
})