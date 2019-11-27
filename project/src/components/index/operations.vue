<template>
  <div id="operations_root" class="operations_root">
    <Title title="运维托管" title-en="Operations managed"></Title>
    <div class="operations_main">
      <div class="title">
        <p>很多中小企业的服务器资存在浪费，特别是服务没有保障。</p>
        <p>我们为中小企业以及个人提供专业的运维托管服务，让您用最小的成本为您的网络产品保驾护航。</p>
        <p>减少不必要的运维开支，包括服务器成本、人力成本。</p>
      </div>
      <div class="operations_inf">
        <li>
          <div class="left">
            <img src="../../img/operations1.jpg" alt>
          </div>
          <div class="right">
            <h5>
              <span>专业的团队</span>
            </h5>

            <p>我们具有高级架构师资质认证的专业运维团队</p>
            <p>来自阿里、百度、滴滴等国内一线互联网公司的骨干员工，具有多年丰富的运维经验</p>
            <p>7*24小时的技术支持，基础性能和业务的定制化监控，为您的持续业务稳定和安全保驾护航</p>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="../../img/operations2.jpg" alt>
          </div>

          <div class="right">
            <h5>
              <span>全方位服务</span>
            </h5>

            <p>应用服务搭建，服务器维护与优化并提供全面安全防护设置</p>
            <p>故障排除、负载均衡方案等扩展服务，实现企业的一站式运维</p>
            <p>帮您从繁琐复杂的运维工作中释放自我</p>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="../../img/operations3.jpg" alt>
          </div>
          <div class="right">
            <h5>
              <span>成本最小</span>
            </h5>

            <p>最前沿的技术解决方案与云端的支持，保证服务质量的基础上提高灵活性</p>
            <p>业务的秒级上线，持续集成与测试</p>
            <p>实时掌控业务与系统行为，快速发现与定位问题</p>
            <p>让您花最小的成本，获得最大的效率与最高的服务质量</p>
          </div>
        </li>
      </div>
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
.operations_root {
  margin: 90px auto 0;
  width: 10%;
  padding-top: 60px;
  min-width: 1000px;
  overflow: hidden;
}

.operations_main {
  .title {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: center;
    line-height: 30px;
    margin-top: 50px;
    margin-bottom: 80px;
  }
  .operations_inf {
    li {
      display: block;
      overflow: hidden;
      padding: 40px 0;
    }
    .left {
      float: left;
      img {
        width: 260px;
        height: 260px;
      }
    }
    .right {
      li {
        width: 100%;
      }
      margin-left: 170px;
      float: left;
      h5 {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 60px;
        span {
          padding-bottom: 10px;
          display: inline-block;
          border-bottom: 2px solid #004fff;
        }
      }
      p{
          font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 30px;
      }
    }
  }
}
</style>
