<template>
  <div class="banner_root">
      <div class="banner_main">
          <h1>Programmer</h1>
          <div>
            <p> 我们致力于为企业提供互联网项目开发</p>
            <p>与运维的一体化解决方案。</p>
            <p>帮助企业完成产品快速迭代、互联网转型</p>
            <p>以及后期运维托管服务。</p>
            <p>用技术为企业增长加速、用诚心为企业运维保驾护航。</p>
          </div>
          <el-button class="banner_upproject" type="primary">提交项目</el-button>
      </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      logo: "test"
    };
  }
};
</script>
<style lang="scss" scoped>
.banner_root {
 
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  background: url("../../img/header.png") no-repeat 100% 100%;
}
.banner_main{
   width: 70%; 
   margin: 0 auto;
    margin-top: 135px;
    h1{
        font-size: 55px;
        color: rgba(0,0,0,0.65);
        font-weight: 500;
        margin-bottom: 60px;
    }
    p{
       color: rgba(0,0,0,0.45);
       line-height: 30px;
    }
    .banner_upproject{
            width: 233px;
            height: 60;
            border-radius: 40px;
            margin-top: 60px;
            margin-bottom: 108px;
}
}

</style>
