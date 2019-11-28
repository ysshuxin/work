<template>
  <div class="about_root" id="about_root">
    <Title title="关于我们" title-en="About us"></Title>
    <div class="about_main">
      <p>
        北京丽萨生活科技有限公司致力于为企业提供互联网项目开发与运维的一体化解决方案。帮助企业完成产品快速迭代、互联网转型以及后期运维托管服务。
      </p>
      <p>用技术为企业增长加速、用诚心为企业运维保驾护航。</p>
      <p>团队核心成员来自阿里、京东、滴滴等一线互联网公司，</p>
      <p>
        产品与开发人员在金融、大数据、物联网、共享经济、电商、信息服务等多个领域均有丰富的产品设计和开发经验。
      </p>
      <p>
        我们严格遵守通用代码开发和产品设计规范，并基于阿里云等云服务平台构建提供全方位的监控和及时的日常运维。
      </p>
      <p>
        我们相信技术和产品的力量，我们像对待孩子一样对待每一个经手的产品，也非常希望用真诚和实力获得您的认可。
      </p>
      <p>预祝商祺！</p>
      <p>北京丽萨生活科技有限公司</p>
    </div>
    <div class="menmber">
      <label class="label">投资机构:</label>
      <img class="logo" src="../../img/icon/ex/2.jpg" alt="" />
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
.about_root {
  margin: 50px auto 0;
  padding-top: 60px;
  width: 70%;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
}

.about_main {
  margin-top: 45px;
  text-align: center;

  p {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: center;
    line-height: 30px;
  }
}
.menmber {
  margin-top: 20px;
  text-align: center;
  .label {
    vertical-align: top;
    position: relative;
    top: 50px;
  }
  .logo {
    width: 200px;
    height: 120px;
  }
}
</style>
