import request from "@/api/request";

// 查看退单列表
function getOrderBack(data) {
  return request({
    url: "/api/leju/admin/orderBack/list",
    method: "get",
    data
  });
}
// 查看退单详情
function orderBackDetail(data) {
  return request({
    url: "/api/leju/admin/orderBack/detail",
    method: "get",
    data
  });
}
// 拒绝退单
function rejectBack(data) {
  return request({
    url: "/api/leju/admin/orderBack/rejectBack",
    method: "post",
    data
  });
}
// 同意订单
function agreeBack(data) {
  return request({
    url: "/api/leju/admin/orderBack/agreeBack",
    method: "post",
    data
  });
}
// 收到货物,关闭订单
function backDone(data) {
  return request({
    url: "/api/leju/admin/orderBack/backDone",
    method: "post",
    data
  });
}
// 强制关闭订单
function closeOrder(data) {
  return request({
    url: "/api/leju/admin/orderBack/closeOrder",
    method: "post",
    data
  });
}

// 用户申请退货
function userOrderBack(data) {
  return request({
    url: "/api/leju/front/order/backOrder",
    method: "post",
    data
  });
}

export default {
  getOrderBack,
  orderBackDetail,
  rejectBack,
  agreeBack,
  backDone,
  closeOrder,
  userOrderBack
};
