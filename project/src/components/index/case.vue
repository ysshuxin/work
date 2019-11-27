<template>
  <div id="case_root" class="case_root">
    <Title title="商业案例" title-en="Business case"></Title>
    <div  class="case_main">
        <p class="title">目前我们服务的客户有初创企业、有个人、也有传统企业。涵盖电商、O2O、工具、内容、SaaS等几大行业。</p>
    </div>
    <div class="block">
   
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  </div>
</template>
<script>
import Title from "../globle/title";
export default {
  components: {
    Title
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
.case_root {
  margin: 110px auto 0;
  padding-top: 60px;
  width: 70%;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
}

.case_main {
 .title{
     font-size: 14px;
color: #4A4A4A;
text-align: center;
margin-top: 50PX;
margin-bottom: 45PX;
 }

}
</style>
