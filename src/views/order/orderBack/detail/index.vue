<template>
  <div class="order-back-detail">
    <el-card class="card order-back-card" shadow="never">
      <!-- 商品信息 -->
      <div class="product-info">
        <div class="common-title">退货商品</div>
        <el-table :data="skuCom" border stripe>
          <el-table-column align="center" label="商品图片" width="120">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.cover_img" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="gname" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="gdescr" label="商品描述"></el-table-column>
          <el-table-column align="center" prop="sku_code" label="货号" width="120"></el-table-column>
          <el-table-column align="center" prop="count" label="样式" width="120"></el-table-column>
          <el-table-column align="center" prop="color_text" label="数量" width="120"></el-table-column>
          <el-table-column align="center" fixed="right" label="小计" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.sku_price * scope.row.count}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 订单信息 -->
        <div class="order-info table-layout-orientation">
          <div class="common-title">订单信息</div>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>退单单号:</span>
              </div>
              <div class="table-cell-body">
                <span>{{backId}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>当前状态:</span>
              </div>
              <div class="table-cell-body">
                <span
                  :style="{color:order.statusend == '0' ? 'green' : 'red'}"
                >{{order.statusend | statusend }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>当前进度:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.process | process }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>订单编号:</span>
              </div>
              <div class="table-cell-body">
                <span>{{ order.orderId }}</span>
                <router-link
                  style="color: #1989fa"
                  :to="{name:'orderDetail',params:{
                    id:order.orderId
                }}"
                >点击查看订单详情</router-link>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>申请时间:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.addtime }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>用户账号:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.username }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px">
            <el-col :span="12">
              <div class="table-cell-head">
                <span>联系人:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.nickname }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="table-cell-head">
                <span>联系电话:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.tel }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="table-cell-head">
                <span>收获地址:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.cityStr }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="table-cell-head">
                <span>邮政编码:</span>
              </div>
              <div class="table-cell-body">
                <span>{{ 41100 }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="table-cell-head">
                <span>详细地址:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.cityBak }}</span>
              </div>
            </el-col>
          </el-row>
          <!-- 补充金额 -->
          <el-row style="margin-top: 30px">
            <el-col :span="12">
              <div class="table-cell-head">
                <span>订单金额:</span>
              </div>
              <div class="table-cell-body">
                <span>{{order.order_price }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="table-cell-head">
                <span>确认退款金额:</span>
              </div>
              <div class="table-cell-body">
                ￥
                <el-input-number
                  style="text-indent:0"
                  v-model="backObj.back_price"
                  :disabled="false"
                  size="mini"
                  label
                  :min="0"
                ></el-input-number>
              </div>
            </el-col>
          </el-row>
          <!-- 补充信息 -->
          <el-row style="margin-top: 30px">
            <el-col :span="24">
              <div class="table-cell-head">
                <span>处理备注:</span>
              </div>
              <div class="table-cell-body">
                <el-input v-model="backObj.bak" size="mini" :max="50" placeholder="通过/拒绝的处理备注信息"></el-input>
              </div>
            </el-col>
          </el-row>
          <!-- 处理结果 -->
          <div class="common-title">处理结果</div>
          <el-row style="margin-top: 30px">
            <el-col :span="24">
              <div class="table-cell-head">
                <span>处理结果:</span>
              </div>
              <div class="table-cell-body">
                <span>{{ order.handlebak }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <div class="box-btn" v-if="order.process == '0'">
      <el-button type="default" @click="rejectBack">拒绝退单</el-button>
      <el-button type="primary" @click="agreeBack">同意退单</el-button>
    </div>
    <div class="box-btn" v-if="order.process == '1'">
      <el-button type="primary" @click="backDone">收到货物,关闭订单</el-button>
    </div>
  </div>
</template>

<script>
import orderBackApi from "@/api/order/back.js";
export default {
  name: "OrderBackDetail",
  components: {},
  data() {
    return {
      backId: "",
      order: {},
      //   商家补充信息
      backObj: {}
    };
  },
  computed: {
    skuCom() {
      if (this.order.product) {
        //   把购买的总数赋给sku
        this.order.product.count = this.order.count;
        return [this.order.product];
      }
    }
  },
  methods: {
    orderBackDetail() {
      orderBackApi
        .orderBackDetail({
          id: this.backId
        })
        .then(res => {
          console.log(res);
          this.order = res.data;
        });
    },
    // 拒绝退单
    rejectBack() {
      orderBackApi
        .rejectBack({
          id: this.backId,
          bak: this.backObj.bak
        })
        .then(res => {
          console.log(res);
          if (res.code == "success") {
            window.location.reload();
            this.$message.success("退单已拒绝!关闭订单");
            this.closeOrder(); //强制关闭订单
          }
        });
    },
    // 同意退单
    agreeBack() {
      orderBackApi
        .agreeBack({
          id: this.backId,
          bak: this.backObj.bak,
          back_price: "123"
        })
        .then(res => {
          console.log(res);
          if (res.code == "success") {
            window.location.reload();
            this.$message.success("订单以同意!等待收货");
          }
        });
    },
    // 收到货物,关闭订单
    backDone() {
      orderBackApi
        .backDone({
          id: this.backId,
          bak: this.backObj.bak
        })
        .then(res => {
          console.log(res);
          if (res.code == "success") {
            window.location.reload();
            this.$message.success("收到货物,关闭订单");
          }
        });
    },
    // 强制关闭订单 用于拒绝退单之后
    closeOrder() {
      orderBackApi
        .closeOrder({
          id: this.backId,
          bak: this.backObj.bak
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  created() {
    this.backId = this.$route.params.id;
    this.orderBackDetail();
  },
  mounted() {},
  filters: {
    money(val) {
      val = Math.floor(val);
      return val / 100;
    },
    process(val) {
      switch (val) {
        case "0":
          return "等待处理";
          break;
        case "1":
          return "确认退货,等待收货";
          break;
        case "2":
          return "确认收货,已退款";
          break;
        case "9":
          return "拒绝退货";
          break;
        default:
          return "错误";
          break;
      }
    },
    statusend(val) {
      switch (val) {
        case "0":
          return "正在进行中";
          break;
        case "1":
          return "已关闭";
          break;
        default:
          return "错误";
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.order-back-detail {
  margin-bottom: 60px;
  .box-btn {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order-back-card {
    width: 1200px;
    margin: 0 auto !important;
  }
  .card {
    margin: 30px;
  }
  .cover-img {
    width: 120px;
    height: auto;
  }
  .common-title {
    margin: 30px;
  }
  .table-layout-orientation {
    margin-top: 20px;
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;

    .el-row {
      box-sizing: border-box;
      .el-col {
        display: flex;
        height: 40px;
        line-height: 40px;
        .table-cell-head {
          border: 1px solid #dcdfe6;
          font-size: 14px;
          width: 200px;
          text-align: left;
          text-indent: 1em;
          color: #666;
          background-color: #f5f7fa;
        }
        .table-cell-body {
          width: calc(100% - 200px);
          color: #606266;
          overflow: hidden;
          text-align: left;
          text-indent: 1em;
          border-top: 1px solid #dcdfe6;
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }
  }
}
</style>
