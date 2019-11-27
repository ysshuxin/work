<template>
  <div id="case_root" class="case_root">
    <Title title="商业案例" title-en="Business case"></Title>
    <div  class="case_main">
        <p class="title">目前我们服务的客户有初创企业、有个人、也有传统企业。涵盖电商、O2O、工具、内容、SaaS等几大行业。</p>
    </div>
    <div class="block">
   
    <el-carousel  height="180px" width="300px">
      <el-carousel-item key="1">
        <img src="../../img/icon/ex/1.jpg" alt="">
        <img src="../../img/icon/ex/2.jpg" alt="">
        <img src="../../img/icon/ex/3.jpg" alt="">
      </el-carousel-item>
       <el-carousel-item key="2">
        <img src="../../img/icon/ex/4.png" alt="">
        <img src="../../img/icon/ex/5.png" alt="">
        <img src="../../img/icon/ex/6.png" alt="">
      </el-carousel-item>
       <el-carousel-item key="3">
        <img src="../../img/icon/ex/7.jpg" alt="">
        <img src="../../img/icon/ex/8.jpg" alt="">
        <img src="../../img/icon/ex/9.jpg" alt="">
      </el-carousel-item>
       <el-carousel-item key="4">
        <img src="../../img/icon/ex/10.png" alt="">
        <img src="../../img/icon/ex/11.jpg" alt="">
        <img src="../../img/icon/ex/12.jpg" alt="">
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
<style lang="scss" >

  
.case_root {
  margin: 110px auto 0;
  padding-top: 60px;
  width: 70%;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
 .case_main {
 .title{
     font-size: 14px;
color: #4A4A4A;
text-align: center;
margin-top: 50PX;
margin-bottom: 45PX;
 }

}
  .el-carousel__item {
   text-align: center;
   line-height: 100%;
    img {
    width: 20%;
      vertical-align: middle;
      position: relative;
      top: 30px;
  }
 }
 
 .el-carousel__indicators--horizontal .el-carousel__button{
    background-color: #333;
  }

}


</style>
