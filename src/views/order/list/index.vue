<template>
  <div class="order-list">
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
          <el-select size="small" v-model="search.status" placeholder="请选择订单状态">
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
          <el-button size="small" type="primary" @click="getOrderList">搜索</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addAvatar">新增地址</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="login">用户登陆</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="avatarList">地址列表</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addOrder">新增订单</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 列表块 -->
    <el-card shadow="hover" class="box-card">
      <el-table :data="orderList" border stripe>
        <el-table-column align="center" type="index" fixed label="#" :width="50"></el-table-column>
        <el-table-column align="center" prop="orderId" label="订单编号" :width="200"></el-table-column>
        <el-table-column align="center" prop="addTime" label="添加时间" :width="200"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" :width="120"></el-table-column>
        <el-table-column align="center" label="订单金额(单位:元)" :width="150">
          <template slot-scope="scope">
            <span>💴 {{ scope.row.price | money }}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="count" label="订单数量" :width="120"></el-table-column>
        <el-table-column align="center" label="订单状态" :width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.orderStatus | status }}:{{ scope.row.orderStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否关闭" :width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.statusend | statusend }}:{{ scope.row.statusend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="doneTime" label="完成时间" :width="200"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <router-link
              :to="{name:'orderDetail',params:{
              id:scope.row.orderId
            }}"
              tag="div"
            >
              <el-button type="primary" size="mini">查看订单详情</el-button>
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
import orderApi from "@/api/order";
import { resetData } from "@/utils/index";
import _ from "lodash";
export default {
  name: "OrderList",
  components: {},
  data() {
    return {
      search: {},
      statusList: [
        //订单状态
        {
          label: "已付款",
          val: 1
        },
        {
          label: "已发货",
          val: 2
        },
        {
          label: "已收货",
          val: 3
        },
        {
          label: "申请退款",
          val: 9
        }
      ],
      statusendList: [
        //订单是否关闭
        {
          label: "是",
          val: 1
        },
        {
          label: "否",
          val: 0
        }
      ],
      // 订单列表数据
      orderList: [],
      page: {
        start: 1,
        limit: 10,
        total: 0
      }
    };
  },
  computed: {},
  methods: {
    getOrderList() {
      var obj = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      if (this.search.status == "0") {
        obj = _.pickBy(obj, item => item);
        obj.status = "0";
      } else if (this.search.statusend == "0") {
        obj = _.pickBy(obj, item => item);
        obj.statusend = "0";
      } else {
        obj = _.pickBy(obj, item => item);
      }
      orderApi.getOrderList(obj).then(res => {
        this.orderList = res.data.list;
        this.page.total = res.data.totalRow;
      });
    },
    // 重置搜索内容
    reset() {
      resetData(this, "search");
    },
    // 新增地址
    login() {
      var obj = {
        username: "杨",
        password: 123456
      };
      orderApi.login(obj).then(res => {
        console.log(res);
      });
    },
    addAvatar() {
      var obj = {
        userId: "f6d202d71731451097e7653b3e4b3026",
        tag: "公司",
        cityCode: "410101,100101,1001010",
        cityStr: "河南省,郑州市,郑东新区",
        cityBak: "金水路绿地新都汇2号楼c座703",
        tel: "13294221396",
        name: "克苏鲁",
        isUse: "1"
      };
      orderApi.addAvatar(obj).then(res => {
        console.log(res);
      });
    },
    // 地址列表
    avatarList() {
      orderApi
        .avatarList({
          userId: "f6d202d71731451097e7653b3e4b3026"
        })
        .then(res => {
          console.log(res);
        });
    },
    // 新增订单
    addOrder() {
      var obj = {
        userId: "f6d202d71731451097e7653b3e4b3026",
        addressId: "1641817bfcec463ebae734287739ae88",
        count: 5,
        freight: 3000,
        price: 5000,
        "orderDetail[0]": {
          skuId: "d75e820de55c4574bcd3b16f55fc8e13",
          price: 1,
          count: 2
        },
        "orderDetail[1]": {
          skuId: "ffbfb1aa0953424298136676afd01243",
          price: 3,
          count: 4
        }
      };
      orderApi.addOrder(obj).then(res => [console.log(res)]);
    },
    // 翻页方法
    handleSizeChange(val) {
      this.page.limit = val;
      this.getOrderList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getOrderList();
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.getOrderList();
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
        case "1":
          return "已付款";
          break;
        case "2":
          return "已发货";
          break;
        case "3":
          return "已收货";
          break;
        case "9":
          return "申请退款";
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
.order-list {
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
