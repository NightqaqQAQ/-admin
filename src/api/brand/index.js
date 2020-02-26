import request from "@/api/request";

function getBrandList(data) {
  return request({
    url: "/api/leju/admin/brand/list",
    method: "get",
    data
  });
}

// 查看品牌详情
function getBrandDetails(data) {
  return request({
    url: "/api/leju/admin/brand/detail",
    method: "get",
    data
  });
}
export default {
  getBrandDetails,
  getBrandList
};
