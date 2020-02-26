import axios from "axios";
import qs from "qs";
const service = axios.create({
  timeout: 5000 // request timeout
});
service.interceptors.response.use(
  //拦截返回数据
  response => {
    //成功的回调
    const res = response.data; //去掉外层data
    return res;
  }
);
function http(config) {
  if (config.method.toLowerCase() == "post") {
    //如果是post请求 把数据变成JSON
    //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
    //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
    config.data = qs.stringify(config.data, {
      arrayFormat: "repeat",
      allowDots: true
    });
  } else {
    //   如果是get请求 赋给params
    config.params = config.data;
  }
  return service(config);
}
export default http;
