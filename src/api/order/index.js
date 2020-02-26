import request from "@/api/request";

// 查看订单列表
function getOrderList(data) {
  return request({
    url: "/api/leju/admin/order/list",
    method: "get",
    data
  });
}

// 订单用户信息
function getOrderUser(data) {
  return request({
    url: "/api/leju/admin/order/orderUserInfo",
    method: "get",
    data
  });
}
// sku详情
function getOrderDetail(data) {
  return request({
    url: "/api/leju/admin/order/detail",
    method: "get",
    data
  });
}
// 确认发货
function postSendDone(data) {
  return request({
    url: "/api/leju/admin/order/sendDone",
    method: "post",
    data
  });
}
// 关闭订单
function closeOrder(data) {
  return request({
    url: "/api/leju/admin/order/closeOrder",
    method: "get",
    data
  });
}

// 新增地址
function addAvatar(data) {
  return request({
    url: "/api/leju/front/address/seave",
    method: "post",
    data
  });
}
// 地址列表
function avatarList(data) {
  return request({
    url: "/api/leju/front/address/list",
    method: "get",
    data
  });
}

// 用户登陆
function login(data) {
  return request({
    url: "/api/leju/front/user/doLogin",
    method: "post",
    data
  });
}
// 新增订单
function addOrder(data) {
  return request({
    url: "/api/leju/front/order/addOrders",
    method: "post",
    data
  });
}
// 确认收货
function confirm(data) {
  return request({
    url: "/api/leju/front/order/allDone",
    method: "get",
    data
  });
}

export default {
  getOrderList,
  getOrderUser,
  getOrderDetail,
  postSendDone,
  closeOrder,
  addAvatar,
  login,
  avatarList,
  addOrder,
  confirm
};
