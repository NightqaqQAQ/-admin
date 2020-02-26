import request from "@/api/request";

// 查看商品列表
function getclassification(data) {
  return request({
    url: "/api/leju/admin/kind/list",
    method: "get",
    data
  });
}
export default {
    getclassification
};
