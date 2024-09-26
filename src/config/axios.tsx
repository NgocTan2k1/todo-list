import axios, {
    AxiosHeaders,
    type InternalAxiosRequestConfig,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type RawAxiosRequestHeaders,
} from 'axios';

/**
 * the https method
 * @param baseURL: The API endpoint is not defined in the .env file
 * @param configs: The configs of axios
 * @param headerConfigs: The header config of axios
 * @returns The AxiosInstance
 */
const https = (
    baseURL: string,
    configs: AxiosRequestConfig,
    headerConfigs: RawAxiosRequestHeaders | AxiosHeaders,
): AxiosInstance => {
    /**
     * Create a Axios Instance.
     */
    const https: AxiosInstance = axios.create({
        baseURL: baseURL || process.env.REACT_BASE_URL_END_POINT,
        ...configs,
        headers: {
            ...headerConfigs,
        },
    });

    /**
     * Configure request before sending
     */
    https.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => {
            console.log('Configure REQUEST before sending request:', request);
            // // Attach the token to the request header
            // const token: string = localStorage?.getItem('accessToken') || '';
            // if (token) {
            //     // request.headers.Authorization = `Bearer ${token}`;
            // }

            return request;
        },
        (error) => {
            console.log('Configure ERROR before sending request:', error);

            return Promise.reject(error);
        },
    );

    /**
     * Configure response before receiving
     */
    https.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log('Configure RESPONSE before receving response:', response);
            return response;
        },
        (error) => {
            console.log('Configure ERROR before receving response:', error);
            // Check Unauthorization error
            // if (error) {
            //     const refreshToken: string = localStorage?.getItem('refreshToken') || '';

            //     // Attach the refreshToken to the request header
            //     if (refreshToken) {
            //         error.headers.Authorization = `Bearer ${refreshToken}`;

            //         // Call this API again
            //         return error.request;
            //     }
            //     // Call the logout funtion
            // }
            return Promise.reject(error);
        },
    );

    return https;
};

export { https };
