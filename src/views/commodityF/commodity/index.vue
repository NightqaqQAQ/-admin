<template>
  <div class="commodity-main">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>搜索商品</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="search.gname" placeholder="请输入商品名称" width="200" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.brandId" size="small" placeholder="请选择品牌">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.cname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.kindId" size="small" placeholder="请选择分类">
            <el-option v-for="item in cftList" :key="item.id" :label="item.ctitle" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="search.pcode" placeholder="请输入商品编码" width="200" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <p>
            是否上架:
            <el-radio v-model="search.isshow" :label="0">是</el-radio>
            <el-radio v-model="search.isshow" :label="1">否</el-radio>
          </p>
        </el-col>
        <el-col :span="8">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button type="primary" @click="getCommodity" size="small">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>商品列表</span>

        <router-link class="add" tag="div" :to="{name:'commodityForm'}">
          <el-button type="primary" size="small">新增商品</el-button>
        </router-link>
      </div>
      <!-- 表格 -->
      <el-table :data="commodityListCom" border style="width: 100%">
        <el-table-column fixed="left" align="center" type="index" label="#" width="50"></el-table-column>
        <el-table-column align="center" label="封面图片" width="120">
          <template slot-scope="scope">
            <el-image style="height: 70px" fit="contain" :src="scope.row.cover_img"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gname" label="商品名称" width="300">
          <template slot-scope="scope">
            <p>{{ scope.row.gname }}</p>
            <p>品牌:{{ scope.row.brandName }}|{{ scope.row.brandEname }}</p>
            <p>描述:{{ scope.row.descr }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品标签" width="120">
          <template slot-scope="scope">
            <p>
              上架:
              <el-switch v-model="scope.row.isshow" :active-value="1" :inactive-value="0"></el-switch>
            </p>
            <p>
              最热:
              <el-switch v-model="scope.row.ishot" :active-value="1" :inactive-value="0"></el-switch>
            </p>
            <p>
              最新:
              <el-switch v-model="scope.row.new" :active-value="1" :inactive-value="0"></el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="ctitles" label="分类" width="120"></el-table-column>
        <el-table-column label="售价" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.price_now | money}}元</p>
            <p>货号:{{scope.row.pcode}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品排序" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.sort}}号</p>
          </template>
        </el-table-column>
        <el-table-column label="库存sku:" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="getskuList(scope.row.id)">
              <i class="el-icon-edit"></i>sku
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="原产地" width="200">
          <template slot-scope="scope">
            <p>{{scope.row.origin_city}}</p>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="200">
          <template slot-scope="scope">
            <p>{{scope.row.addtime}}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-popconfirm @onConfirm="delCom(scope.row.id)" title="确定删除吗？">
              <el-button type="danger" slot="reference" size="mini">删除</el-button>
            </el-popconfirm>
            <router-link
              class="add"
              tag="div"
              :to="{name:'commodityForm',query:{
              id: scope.row.id
            }}"
            >
              <el-button type="primary" size="mini">修改</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-box"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
      <!-- sku打开的表格 -->
      <el-dialog title="sku详情" width="60%" :visible.sync="dialogTableVisible">
        <el-table :data="skuList">
          <el-table-column property="color_text" label="颜色描述" width="150"></el-table-column>
          <el-table-column property="color" label="颜色编码" width="150"></el-table-column>
          <el-table-column label="价格" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.price | money}}元</p>
            </template>
          </el-table-column>
          <el-table-column property="count" label="数量" width="150"></el-table-column>
          <el-table-column property="sku_code" label="sku编码" width="150"></el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import commodityApi from "@/api/commodity";
import skuApi from "@/api/sku";
import cftApi from "@/api/classification/index";
import brandApi from "@/api/brand/index";
import _ from "lodash";
import { resetData } from "@/utils/index";
export default {
  name: "Commodity",
  components: {},
  data() {
    return {
      search: {
        isshow: "",
        kindId: "",
        brandId: ""
      },
      options: {},
      commodityList: [],
      page: {
        start: 1,
        limit: 5,
        total: 0
      },
      // sku数据
      dialogTableVisible: false,
      skuList: [],
      cftList: [],
      brandList: []
    };
  },
  computed: {
    commodityListCom() {
      this.commodityList.map(ele => {});
      return this.commodityList;
    }
  },
  methods: {
    // 获取列表事件
    getCommodity() {
      var params = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      params = _.pickBy(params, item => item);
      commodityApi.getCommodity(params).then(res => {
        this.commodityList = res.data.list;
        this.page.total = res.data.totalRow;
      });
    },
    // 删除事件
    handleClick(val) {},
    // 分页事件
    handleSizeChange(val) {
      this.page.limit = val;
      this.getCommodity();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getCommodity();
    },
    // sku详情事件
    getskuList(id) {
      this.dialogTableVisible = true;
      skuApi.getSkuList({ productId: id }).then(res => {
        this.skuList = res.data;
      });
    },
    // 删除商品
    delCom(id) {
      commodityApi.delCom({ id }).then(res => {
        if (res.code == "success") {
          this.$message("删除成功");
          this.getCommodity();
        }
      });
    },
    // 获取分类列表
    getclassification() {
      cftApi.getclassification().then(res => {
        this.cftList = res.data;
      });
    },
    // 获取品牌列表
    getBrandList() {
      brandApi.getBrandList().then(res => {
        this.brandList = res.data.list;
      });
    },
    // 重置搜索栏
    reset() {
      resetData(this, "search");
    }
  },
  created() {
    this.getCommodity();
    this.getclassification();
    this.getBrandList();
  },
  mounted() {},
  // 过滤价格
  filters: {
    money(val) {
      val = Math.floor(val);
      return val / 100;
    }
  }
};
</script>

<style scoped lang="scss">
.commodity-main {
  .box-card {
    margin: 20px;
    .el-row {
      margin-bottom: 20px;
      .el-input {
        width: 200px;
      }
    }
    .add {
      float: right;
    }
  }
  .page-box {
    float: right;
    padding: 10px;
  }
}
</style>
