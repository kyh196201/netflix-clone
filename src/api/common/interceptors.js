import store from "@/store/index";

function setInterceptors(axiosInstance) {
    axiosInstance.interceptors.request.use(
        function(config) {
            config.timeout = 2500;
            config.params["language"] = store.state.language;
            config.params["include_adult"] = store.state.isAdult;
            return config;
        },
        function(error) {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default setInterceptors;
