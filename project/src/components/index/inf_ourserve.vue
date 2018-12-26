<template>
  <div class="ourserver_root">
    <Title title="我们的服务" title-en="How we work?"></Title>
    <div class="ourserver_main">
      <ul>
        <li>
          <div class="title">1.</div>
          <h5>产品开发</h5>
          <p>我们为企业提供定制化开发服务</p>
          <p>从需求调研、产品设计到源代码交付</p>
        </li>
        <li>
          <div class="title">2.</div>
          <h5>服务托管</h5>
          <p>为中小企业提供专业的7*24*365的运维服务</p>
          <p>包括服务器配置方案和托管</p>
        </li>
        <li>
          <div class="title">3.</div>
          <h5>商业咨询</h5>
          <p>我们为企业提供成长过程中所需要的</p>
          <p>多种咨询服务和整体解决方案</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Title from "../globle/title";

export default {
  components: {
    Title
  }
};
</script>
<style lang="scss" scoped>
.ourserver_root {
  margin: 95px auto 0;
  width: 70%;
  min-width: 1000px;
  overflow: hidden;
}
.ourserver_main {
    margin-top: 50px;
  text-align: center;
  margin-bottom: 150px;
  li {
    display: inline-block;
    width: 30%;
    .title {
      font-size: 60px;
      color: #004fff;
    }
    h5 {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      color: #4a4a4a;
      line-height: 30px;
    }
  }
}
</style>
