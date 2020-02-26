import request from "@/api/request";

// 查看sku列表
function getSkuList(data) {
  return request({
    url: "/api/leju/admin/productSku/skuList",
    method: "get",
    data
  });
}
export default {
    getSkuList
};
