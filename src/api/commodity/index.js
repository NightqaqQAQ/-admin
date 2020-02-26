import request from "@/api/request";

// 查看商品列表
function getCommodity(data) {
  return request({
    url: "/api/leju/admin/product/list",
    method: "get",
    data
  });
}
// 新增商品
function addCommodity(data) {
  return request({
    url: "/api/leju/admin/product/saveOrUpdate",
    method: "post",
    data
  });
}
// 删除商品
function delCom(data) {
  return request({
    url: "/api/leju/admin/product/delete",
    method: "get",
    data
  });
}
// 商品明细
function detalisCom(data) {
  return request({
    url: "/api/leju/admin/product/detail",
    method: "get",
    data
  });
}
// 更新商品
function updateCom(data) {
  return request({
    url: "/api/leju/admin/product/updateProduct",
    method: "post",
    data
  });
}

export default {
  getCommodity,
  addCommodity,
  delCom,
  detalisCom,
  updateCom
};
