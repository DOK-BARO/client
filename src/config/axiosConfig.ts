import axios from "axios";
import localApi from "@/services/local/LocalApi";

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL,
});

const logOnDev = (message: string) => {
	if (import.meta.env.DEV) {
		console.log(message);
	}
};

axiosInstance.interceptors.response.use((response) => {
	const { method, url } = response.config;
	const { status } = response;

	logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);
	return response;
}, (error) => {
	if (error.response?.status === 403) {
		localApi.removeCertification();
	} else if (error.response?.status === 404) {
		//TODO: 에러 이미지 페이지 구현

	} else if (error.response?.status === 500) {
		//TODO: 에러 페이지 구현
	}

	return Promise.reject(error);
});