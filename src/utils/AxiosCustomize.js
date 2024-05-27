import axios from "axios";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//store này chưa data ở file rootReducer
import { store } from "../redux/store";
NProgress.configure({
   showSpinner: false,
   trickleSpeed: 80,
   easing: 'ease', 
   speed: 500,
   });

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });


  //INTERCRPTORS
  // Add a request interceptor
instance.interceptors.request.use(function (config) {
  //lúc gửi request đi thì gửi access_token đi luôn:
  // dòng code dưới đây là để lấy data ở Redux
  console.log('>> check store: ', store.getState())
  const dataOfReduxRToGetToken = store?.getState()?.user?.account?.access_token

  console.log('>> check acces_token: ',dataOfReduxRToGetToken)

  // sau khi lấy được data ở Redux nhờ vào đó ta lấy được access_token để gửi lên server xác minh tài khoản
  config.headers["Authorization"] = `Bearer ${dataOfReduxRToGetToken}` ;

  NProgress.start();

    // Do something before request is sent
    return config;
  }, function (error) {
    NProgress.start();

    // Do something with request error
    return Promise.reject(error);
  });


  //LÚC NÀY PHÍA SERVER GỬI RESPONSE VỀ CLIENT NHƯNG AXIOS === INSTANCE INTERCEPTORS CAN THIỆP VÀO RESPONSE NÀY ĐỂ LẤY CỤC DATA
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  
  NProgress.done();

  ///|||||||
    console.log('response',response.data)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  }, function (error) {

  NProgress.done();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('error',error.response.data)
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  });

  export default instance;