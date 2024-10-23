/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import axios, { AxiosInstance } from "axios";
import { constants } from "./constants";

const BASE_URL = constants.API.BASE_URL + constants.API.PREFIX;

const getAxiosConfig = () => {
    try {
        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        return axiosInstance;
    } catch (error) {
        console.log(error);
    }
};

export const getApi = (): AxiosInstance => {
    
    const axiosInstance = getAxiosConfig();

    if (!axiosInstance) throw new Error('Failed to create Axios instance');

    return axiosInstance;
}