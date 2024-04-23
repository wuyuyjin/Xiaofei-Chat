// import axios, {AxiosRequestConfig} from 'axios';
//
// const Instance = () => {
//   const service = axios.create({
//     baseURL: 'http://127.0.0.1:5000',  // 你的API地址
//     timeout: 10000,  // 请求超时时间
//   });
//
// // 请求拦截器
//   service.interceptors.request.use(
//     config => {
//       // 在发送请求之前做些什么：例如添加token
//       return config;
//     },
//     error => {
//       // 对请求错误做些什么
//       return Promise.reject(error);
//     }
//   );
//
// // 响应拦截器
//   service.interceptors.response.use(
//     response => {
//       // 对响应数据做点什么
//       const res = response.data;
//       // 根据你的业务处理回调
//       if (res.status !== 200) {
//         // 处理错误
//         // ...
//
//         return Promise.reject(new Error(res.message || 'Error'));
//       } else {
//         return res;
//       }
//     },
//     error => {
//       // 对响应错误做点什么
//       console.log('err' + error);  // for debug
//       return Promise.reject(error);
//     }
//   );
//
//   const http ={
//     post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T>{
//       return service.post(url,data,config)
//     },
//     get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>{
//       return service.get(url,config)
//     },
//     delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>{
//       return service.delete(url,config)
//     },
//     put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T>{
//       return service.put(url,data,config)
//     }
//   }
//
//   return {http}
// }
//
// export default Instance;


export const url = "http://127.0.0.1:5000"