<template>
  <div class="order-detail">
    <div class="steps-bar">
      <el-steps :space="300" :active="order.orderStatus-0" finish-status="success">
        <el-step :description="order.addTime" title="已付款"></el-step>
        <el-step :description="order.sendTime" title="已发货"></el-step>
        <el-step :description="order.receiveTime" title="已收货"></el-step>
        <el-step :description="order.doneTime" title="已关闭"></el-step>
      </el-steps>
    </div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        订单当前状态:
        <span
          :style="{color:order.statusend==0 ? 'green' : 'red'}"
        >{{ order.statusend==0 ? "订单正在处理中..." : "已关闭" }}</span>
        <el-button @click="confirm" style="float: right;" size="mini" type="primary">用户确认收货</el-button>
      </div>
      <!-- 基本信息 -->
      <div class="title-box">基本信息:</div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" v-for="(val,key) in getOrderCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-main">
              <span>{{ val }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 收货人信息 -->
      <div class="title-box">收获人信息:</div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" v-for="(val,key) in orderUserCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-main">
              <span>{{ val }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 商品信息 -->
      <div class="title-box">商品信息:</div>
      <el-table :data="orderSkuList" border style="width: 100%">
        <el-table-column fixed type="index" align="center" label="#" :width="50"></el-table-column>
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.cover_img" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="gname" align="center" label="商品名称" width="300"></el-table-column>
        <el-table-column prop="color_text" align="center" label="商品型号" width="300"></el-table-column>
        <el-table-column align="center" label="商品价格(元)" width="120">
          <template slot-scope="scope">
            <span>💴{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sku_code" align="center" label="商品货号" width="120"></el-table-column>
        <el-table-column prop="count" align="center" label="数量" width="120"></el-table-column>
        <el-table-column prop="#" align="center" label="预留" width="120"></el-table-column>
        <el-table-column prop="#" align="center" label="预留" width="120"></el-table-column>
        <el-table-column fixed="right" label="小计(元)" width="100">
          <template slot-scope="scope">
            <span>💴{{ scope.row.price * scope.row.count }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 费用信息 -->
      <div class="title-box">费用信息:</div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" v-for="(val,key) in totalPriceCom" :key="key">
            <div class="table-cell-head">
              <span>{{key}}</span>
            </div>
            <div class="table-cell-main">
              <span>{{ val }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="btn-box">
        <el-button @click="postSendDone" v-if="order.orderStatus=='1'" type="primary">确认发货</el-button>
        <el-button v-if="order.orderStatus=='2'" type="primary">等待收货...</el-button>
        <el-button @click="closeOrder" v-if="order.orderStatus=='3'" type="primary">关闭订单</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import orderApi from "@/api/order";
export default {
  name: "OrderDetail",
  components: {},
  data() {
    return {
      orderId: "",
      orderSkuList: [],
      order: {},
      orderUser: {}
    };
  },
  computed: {
    getOrderCom() {
      //基本信息
      var price, orderStatus, statusend;
      if (this.order.price) {
        price = this.order.price * 0.01 + "元";
      }
      if (this.order.orderStatus) {
        switch (this.order.orderStatus) {
          case "1":
            orderStatus = "已付款";
            break;
          case "2":
            orderStatus = "已发货";
            break;
          case "3":
            orderStatus = "已收货";
            break;
          case "9":
            orderStatus = "申请退款";
            break;
          default:
            orderStatus = "错误";
            break;
        }
      }
      if (this.order.statusend) {
        switch (this.order.statusend) {
          case "0":
            statusend = "正在进行中";
            break;
          case "1":
            statusend = "已关闭";
            break;
          default:
            statusend = "错误";
            break;
        }
      }
      return {
        订单编号: this.order.orderId,
        用户账号: this.order.username,
        订单金额: price,
        订单数量: this.order.count,
        订单状态: orderStatus,
        是否关闭: statusend,
        下单时间: this.order.addTime,
        发货时间: this.order.sendTime,
        收货时间: this.order.receiveTime,
        退单时间: this.order.backTime,
        结束时间: this.order.endTime,
        其他: ""
      };
    },
    orderUserCom() {
      //收获人信息
      return {
        收获人姓名: this.orderUser.username,
        手机号: this.orderUser.tel,
        收货地址: this.orderUser.cityStr,
        详细地址: this.orderUser.cityBak,
        邮政编码: "41000",
        邮箱: this.orderUser.email
      };
    },
    totalPriceCom() {
      var sumPrice = this.orderSkuList.reduce((a, b) => {
        console.log(a, b);
        a += b.price * b.count;
        return a;
      }, 0);
      return {
        商品合计: "💴" + sumPrice,
        运费: 0,
        订单金额: "￥" + sumPrice,
        实付款: "￥" + sumPrice
      };
    }
  },
  methods: {
    // 订单用户信息
    getOrderUser() {
      orderApi.getOrderUser({ orderId: this.orderId }).then(res => {
        console.log(res);
        this.orderUser = res.data;
      });
    },
    // sku详情
    getOrderDetail() {
      orderApi.getOrderDetail({ orderId: this.orderId }).then(res => {
        console.log(res);
        this.orderSkuList = res.data;
      });
    },
    // 订单状态
    getOrder() {
      orderApi.getOrderList({ orderId: this.orderId }).then(res => {
        console.log(res);
        this.order = res.data.list[0];
        if (this.order.statusend == "1") {
          this.order.orderStatus = 9;
        }
      });
    },
    // 确认订单发货
    postSendDone() {
      orderApi
        .postSendDone({
          id: this.orderId
        })
        .then(res => {
          console.log(res);
          if (res.code == "S") {
            this.$message.success("商品已确认发货!刷新页面");
            window.location.reload();
          }
        });
    },
    // 关闭订单
    closeOrder() {
      orderApi.closeOrder({ id: this.orderId }).then(res => {
        console.log(res);
        if (res.code == "S") {
          this.$message.success("订单已关闭!刷新页面");
          window.location.reload();
        }
      });
    },
    // 用户确认收货
    confirm() {
      orderApi.confirm({ id: this.orderId }).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.orderId = this.$route.params.id;
    this.getOrderUser();
    this.getOrderDetail();
    this.getOrder();
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.order-detail {
  .steps-bar {
    margin-top: 30px;
    .el-steps {
      justify-content: center;
    }
  }
  .box-card {
    margin: 20px;
    .title-box {
      height: 80px;
      line-height: 80px;
    }
    .table-layout {
      border-top: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      .el-row {
        box-sizing: border-box;
        .table-cell-head {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #666;
          background-color: #f5f7fa;
          border-right: 1px solid #dcdfe6;
        }
        .table-cell-main {
          height: 60px;
          line-height: 60px;
          color: #606266;
          overflow: hidden;
          text-align: center;
          border-top: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
          border-right: 1px solid #dcdfe6;
        }
      }
    }
    .btn-box {
      width: 100%;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
