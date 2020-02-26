<template>
  <div class="commodityForm-main">
    <!-- 顶部进度条 -->
    <el-steps class="steps" :space="300" :active="num" finish-status="success">
      <el-step title="商品基本信息"></el-step>
      <el-step title="添加商品库存信息"></el-step>
      <el-step title="添加关联商品信息"></el-step>
    </el-steps>
    <!-- 第一步 -->
    <el-card v-show="num==0" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>商品基本信息</span>
      </div>
      <el-form ref="form" :model="commodityForm" label-width="80px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input v-model="commodityForm.gname" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键词">
              <el-input v-model="commodityForm.keywords" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品编码">
              <el-input v-model="commodityForm.pcode" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="品牌">
              <el-select v-model="commodityForm.brand_id" size="small" placeholder="品牌">
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.cname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品系列">
              <el-select v-model="commodityForm.seriesId" size="small" placeholder="商品系列">
                <el-option
                  v-for="item in seriesLsit"
                  :key="item.id"
                  :label="item.cname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原产地">
              <el-cascader size="small" :options="options" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="商品描述">
              <el-input
                type="textarea"
                size="small"
                :rows="3"
                placeholder="请输入商品描述"
                v-model="commodityForm.descr"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品分类">
              <el-checkbox-group v-model="commodityForm.kindIds">
                <el-checkbox v-for="item in cftList" :label="item.id" :key="item.id">{{item.ctitle}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="送货服务">
              <el-checkbox-group v-model="categoryAct" @change="handleCheckedCitiesChange">
                <el-checkbox
                  v-for="item in categoryList"
                  :label="item.val"
                  :key="item.val"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="封面图片">
              <el-upload
                class="upload-demo"
                action="http://www.bufantec.com/api/leju/admin/material/uploadAndSaveImg"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-image style="height: 100px" :src="commodityForm.cover_img" fit="contain">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否热门">
              <el-switch v-model="commodityForm.ishot" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否最新">
              <el-switch v-model="commodityForm.isnew" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否上架">
              <el-switch v-model="commodityForm.isshow" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第六行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="进价">
              <el-input-number
                v-model="commodityForm.price_in"
                :min="0"
                size="small"
                placeholder="(单位:分)"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="市场价">
              <el-input-number
                v-model="commodityForm.price_out"
                :min="0"
                size="small"
                placeholder="(单位:分)"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动价">
              <el-input-number
                v-model="commodityForm.price_now"
                :min="0"
                size="small"
                placeholder="(单位:分)"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第七行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="商品重量">
              <el-input-number
                v-model="commodityForm.weight"
                :min="0"
                size="small"
                placeholder="(单位:克)"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品排序">
              <el-input-number
                v-model="commodityForm.sort"
                :min="0"
                size="small"
                placeholder="默认降序"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品单位">
              <el-input
                v-model="commodityForm.unit_name"
                placeholder="商品单位,比如公斤/个/辆/..."
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button class="btn-box" type="primary" @click="basicNext" size="small">下一步,添加库存信息</el-button>
      </el-form>
    </el-card>
    <!-- 第二步 -->
    <el-card v-show="num==1" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>商品库存信息</span>
      </div>
      <el-form ref="form" :model="commodityForm" label-width="80px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="详情标题">
              <el-input v-model="commodityForm.detail_title" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详情描述">
              <el-input v-model="commodityForm.detail_desc" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="详情图片(多选)">
              <el-upload
                class="upload-demo"
                action="http://www.bufantec.com/api/leju/admin/material/uploadAndSaveImg"
                :on-success="handleAvatarSuccess1"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-image
              class="img-box"
              style="height: 100px"
              v-for="(item,index) in commodityForm.imgs"
              :key="index"
              :src="item"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-form-item label="添加sku">
            <div>
              颜色:
              <el-checkbox-group v-model="skuChkList">
                <el-checkbox v-for="item in skuColList" :label="item" :key="item.id">
                  <span :style="{'color':item.color}">{{ item.color_text }}</span>
                  <span style="font-size:12px;" @click="delColor(item.id)">删除</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <el-input
                class="sku-inp"
                v-model="skuVal.color_text"
                size="small"
                placeholder="颜色描述,比如翡翠绿,缤纷紫"
              ></el-input>
              <el-input
                class="sku-inp"
                v-model="skuVal.color"
                size="small"
                placeholder="颜色值 , 比如 #fff"
              ></el-input>
              <el-button type="primary" size="small" @click="addSku">创建</el-button>
            </div>
            <div>
              <el-button type="primary" size="small" @click="generate">生成</el-button>
            </div>
            <el-table :data="skuList" style="width: 100%" height="250">
              <el-table-column fixed prop="color_text" label="颜色名称" width="100"></el-table-column>
              <el-table-column prop="color" label="颜色值" width="120"></el-table-column>
              <el-table-column label="sku编号" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.sku_code"
                    size="small"
                    placeholder="请输入sku编号(#1000331)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="价格" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.price" size="small" placeholder="请输入sku价格(单位:'分')"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="数量" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.count" size="small" placeholder="请输sku入数量"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-popconfirm @onConfirm="delSku(scope.row.id)" title="确定删除吗？">
                    <el-button type="danger" slot="reference" size="mini">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-row>
        <el-form-item label="商品详情">
          <Tinymce :height="300" ref="tin"></Tinymce>
          <div class="btn-box">
            <el-button size="small" @click="setVal">清空富文本</el-button>
            <el-button type="primary" size="small" @click="getVal">保存富文本内容</el-button>
          </div>
        </el-form-item>
        <div class="btn-box">
          <el-button @click="num=0" size="mini">上一步,商品基本信息</el-button>
          <el-button type="primary" @click="skuNext" size="mini">下一步,关联商品信息</el-button>
        </div>
      </el-form>
    </el-card>
    <!-- 第三步 -->
    <el-card v-show="num==2" class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>关联商品信息</span>
      </div>
      <el-form ref="form" :model="commodityForm" label-width="80px">
        <el-form-item label="关联商品">
          <el-transfer v-model="linkList" :data="commodityList"></el-transfer>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input
            type="textarea"
            size="small"
            :rows="3"
            placeholder="请输入备注信息"
            v-model="commodityForm.bak"
          ></el-input>
        </el-form-item>
        <div class="btn-box">
          <el-button @click="num=1" size="small">上一步,商品库存信息</el-button>
          <el-button type="primary" @click="submit" size="small">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import brandApi from "@/api/brand/index";
import seriesApi from "@/api/series/index";
import cftApi from "@/api/classification/index";
import commodityApi from "@/api/commodity";
import { regionDataPlus, CodeToText } from "element-china-area-data"; //城市数据
import { resetData } from "@/utils/index";
import Tinymce from "@/components/Tinymce";
export default {
  name: "commodityForm",
  components: {
    Tinymce
  },
  data() {
    return {
      // 传入的id 以此判断编辑还是新增
      id: null,
      num: 0,
      options: regionDataPlus,
      commodityForm: {
        kindIds: [],
        cover_img: "",
        imgs: [],
        link1: []
      },
      categoryList: [
        { name: "送货入户", val: 1 },
        { name: "上门安装", val: 2 }
      ],
      categoryAct: [],
      brandList: [],
      seriesLsit: [],
      cftList: [],
      // sku数据
      skuVal: {
        color_text: "",
        color: ""
      },
      skuColList: [],
      // 临时sku数据
      skuChkList: [],
      // 展示数据
      skuList: [],
      // 关联商品列表
      commodityList: [],
      linkList: []
    };
  },
  computed: {},
  methods: {
    //   第一步
    basicNext() {
      this.num++;
    },
    //   第二步
    skuNext() {
      this.num++;
    },
    //   最终提交
    submit() {
      var total = 0;
      var arr = [];
      this.skuList.map((ele, index) => {
        total = Number(ele.count) + total;
        this.commodityForm[`skuList[${index}]`] = {
          sku_code: ele.sku_code,
          color_text: ele.color_text,
          color: ele.color,
          price: ele.price,
          count: ele.count
        };
      });
      this.commodityForm.sku_count = total;
      this.commodityForm.link1 = this.linkList.join(",");
      if (this.id) {
        //判断编辑还是更新
        this.commodityForm.id = this.id;
        this.detalisCom(this.commodityForm);
      } else {
        commodityApi.addCommodity(this.commodityForm).then(res => {
          if (res.code == "success") {
            this.$message("添加商品成功,跳转到商品列表页");
            this.$router.push("/commodityF/commodity");
          }
        });
      }
    },
    // 获取品牌列表
    getBrandList() {
      brandApi.getBrandList().then(res => {
        this.brandList = res.data.list;
      });
    },
    // 获取系列列表
    getSeriesList() {
      seriesApi.getSeriesList().then(res => {
        this.seriesLsit = res.data;
      });
    },
    // 获取分类列表
    getclassification() {
      cftApi.getclassification().then(res => {
        this.cftList = res.data;
      });
    },
    // 城市选择
    handleChange(value) {
      this.commodityForm.origin_code = value + "";
      this.commodityForm.origin_city = CodeToText[value[0]];
    },
    // 选择服务
    handleCheckedCitiesChange(val) {
      var num = 0;
      if (val.length != 0) {
        if (val.length == 2) {
          num = 3;
        } else {
          num = val[0];
        }
      }
      this.commodityForm.service_promise = num;
      console.log(num);
    },
    // 上传图片
    handleAvatarSuccess(response) {
      this.commodityForm.cover_img = response.ossUrl;
    },
    // 上传详情轮播
    handleAvatarSuccess1(response, file, fileList) {
      this.commodityForm.imgs.push(response.ossUrl);
    },
    // 创建sku颜色
    addSku() {
      this.skuVal.id = Math.random();
      this.skuColList.push(this.skuVal);
      resetData(this, "skuVal");
    },
    // 删除sku颜色
    delColor(id) {
      var bl = this.skuChkList.find(ele => ele.id == id);
      if (bl) {
        this.$message.error("选中状态无法删除");
      } else {
        var index = this.skuColList.findIndex(ele => ele.id == id);
        this.skuColList.splice(index, 1);
      }
    },
    // 生成sku表格
    generate() {
      var bl = this.skuList.find(ele => {
        return this.skuChkList.find(item => item.id == ele.id);
      });
      if (bl) {
        this.$message.error("无法重复生成");
      } else {
        this.skuList = [...this.skuChkList, ...this.skuList];
      }
    },
    // 删除sku表格数据
    delSku(id) {
      this.$message("删除成功");
      var index = this.skuList.findIndex(ele => ele.id == id);
      this.skuList.splice(index, 1);
    },
    // 给富文本赋值
    setVal(val) {
      this.$refs.tin.setContent(val);
    },
    // 获取富文本值
    getVal() {
      this.$message("保存成功");
      this.commodityForm.content = this.$refs.tin.getContent();
    },
    // 获取商品列表
    getCommodity() {
      commodityApi.getCommodity().then(res => {
        res.data.list.map(ele => {
          this.commodityList.push({
            label: ele.gname,
            key: ele.id
          });
        });
      });
    },
    // 编辑状态 #########
    detaliShow(id) {
      commodityApi.detalisCom({ id }).then(res => {
        console.log(res);
        this.commodityForm = res.data;
        if (this.commodityForm.content) this.setVal(this.commodityForm.content);
        this.commodityForm.imgs = this.commodityForm.imgs.split(",");
        this.linkList = this.commodityForm.link1.split(",");
        this.commodityForm.kindIds = this.commodityForm.kindIds.split(",");
        this.skuList = this.commodityForm.skuList;
        if (this.commodityForm.service_promise == 3) {
          this.categoryAct = [1, 2];
        }
      });
    },
    // 更新确认
    detalisCom(data) {
      commodityApi.updateCom(data).then(res => {
        if (res.code == "success") {
          this.$message("修改商品成功,跳转到商品列表页");
          this.$router.push("/commodityF/commodity");
        }
      });
    }
  },
  created() {
    this.getBrandList();
    this.getSeriesList();
    this.getclassification();
    this.getCommodity();
    this.id = this.$route.query.id;
    if (this.id) {
      this.detaliShow(this.id);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.commodityForm-main {
  .steps {
    width: 800px;
    margin: 30px auto;
  }
  .box-card {
    margin: 20px 100px;
  }
  .btn-box {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
  .img-box {
    width: 120px;
    height: 120px;
    margin-left: 20px;
  }
  .sku-inp {
    width: 200px;
  }
}
</style>
