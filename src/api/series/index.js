import request from "@/api/request";

// 查看sku列表
function getSeriesList(data) {
  return request({
    url: "/api/leju/admin/series/list",
    method: "get",
    data
  });
}
export default {
    getSeriesList
};
