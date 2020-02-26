<template>
  <div class="order-back">
    <!-- 搜索块 -->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input size="small" class="username" v-model="search.username" placeholder="请输入用户名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select size="small" v-model="search.process" placeholder="请选择订单状态">
            <el-option
              v-for="item in statusList"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-col>
        <el-col class="search-ridio" :span="6">
          <el-select size="small" v-model="search.statusend" placeholder="订单是否关闭">
            <el-option
              v-for="item in statusendList"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="getOrderBack">搜索</el-button>
          <el-button size="small" type="primary" @click="userOrderBack">用户申请退货</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 列表块 -->
    <el-card shadow="hover" class="box-card">
      <el-table :data="orderBackList" border stripe>
        <el-table-column align="center" type="index" fixed label="#" :width="50"></el-table-column>
        <el-table-column align="center" prop="orderId" label="订单编号" :width="200"></el-table-column>
        <el-table-column align="center" prop="addtime" label="申请时间" :width="200"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" :width="120"></el-table-column>
        <el-table-column align="center" label="订单金额(单位:元)" :width="150">
          <template slot-scope="scope">
            <span>💴 {{ scope.row.order_price | money }}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="count" label="订单数量" :width="120"></el-table-column>
        <el-table-column align="center" label="是否关闭" :width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.statusend | statusend }}:{{ scope.row.statusend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="endtime" label="完成时间" :width="200"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <router-link
              :to="{name:'orderBackDetail',params:{
              id:scope.row.backId
            }}"
              tag="div"
            >
              <el-button type="primary" size="mini">查看退单详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import orderBackApi from "@/api/order/back.js";
import { resetData } from "@/utils/index";
import _ from "lodash";
export default {
  name: "OrderBack",
  components: {},
  data() {
    return {
      search: {},
      statusList: [
        //订单状态
        {
          label: "等待处理",
          val: 0
        },
        {
          label: "确认退货,等待收货",
          val: 1
        },
        {
          label: "确认收货,已退款",
          val: 2
        },
        {
          label: "拒绝退货",
          val: 9
        }
      ],
      statusendList: [
        //订单是否关闭
        {
          label: "已结束",
          val: 1
        },
        {
          label: "正在进行",
          val: 0
        }
      ],
      // 订单列表数据
      orderBackList: [],
      page: {
        start: 1,
        limit: 10,
        total: 0
      }
    };
  },
  computed: {},
  methods: {
    getOrderBack() {
      var obj = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      if (this.search.process == "0") {
        obj = _.pickBy(obj, item => item);
        obj.process = '0';
      }else if (this.search.statusend == "0") {
        obj = _.pickBy(obj, item => item);
        obj.statusend = '0';
      }else{
        obj = _.pickBy(obj, item => item);
      }

      orderBackApi.getOrderBack(obj).then(res => {
        this.orderBackList = res.data.list;
        this.page.total = res.data.totalRow;
      });
    },
    // 重置搜索内容
    reset() {
      resetData(this, "search");
    },
    // 翻页方法
    handleSizeChange(val) {
      this.page.limit = val;
      this.getOrderBack();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getOrderBack();
      console.log(`当前页: ${val}`);
    },
    // 用户申请退货
    userOrderBack() {
      var obj = {
        userId: "f6d202d71731451097e7653b3e4b3026",
        orderId: "680099036073824256",
        skuId: "ffbfb1aa0953424298136676afd01243",
        reason: "不想要",
        status: "1",
        count: 1
      };
      orderBackApi.userOrderBack(obj).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.getOrderBack();
  },
  mounted() {},
  // 过滤价格
  filters: {
    money(val) {
      val = Math.floor(val);
      return val / 100;
    },
    status(val) {
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
          return "拒绝退单";
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
.order-back {
  .box-card {
    margin: 20px;
    .username {
      width: 240px;
    }
    /deep/ th {
      background-color: #c1c9dd;
    }
    .page {
      float: right;
      padding: 10px;
    }
  }
}
</style>
