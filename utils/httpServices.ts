import axios from "axios";

axios.interceptors.response.use(null, (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //instead of logging error in the console, use logging as service (sentry)
    console.log(error.response.data.message);
  }
  return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, DELETE, PATCH";
  config.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";
  config.headers["X-Panda-Source"] = "PandaClick";
  config.headers["X-PandaClick-Agent"] = 1;
  config.headers["api-version"] = "2022-03-01";
  config.headers["X-Language"] = "en";
  config.headers["X-SESSION-ID"] = "051E210C-08B8-40C0-BCD9-E86B91A8BF90";
  // config.headers["X-RCS"] = 1;
  return config;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
