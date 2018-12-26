<template>
  <div class="product_root">
    <Title title="产品开发" title-en="Product development?"></Title>
    <p class="title">我们为企业、个人提供互联网产品的咨询、设计和开发的完整解决方案。产品包含网站、H5、APP、小程序等。</p>
    <div class="product_main">
      <ul>
        <li v-on:click="change(1)">
          <img src="../../img/product1.png" alt>
          <h5>MVP实践</h5>
          <span v-show="nowid==1" class="product_icon"></span>
        </li>
        <li v-on:click="change(2)">
          <img src="../../img/product2.png" alt>
          <h5>传统企业+互联网</h5>
          <span v-show="nowid==2" class="product_icon"></span>
        </li>
        <li v-on:click="change(3)">
          <img src="../../img/product3.png" alt>
          <h5>快速迭代</h5>
          <span v-show="nowid==3" class="product_icon"></span>
        </li>
      </ul>
    </div>
    <div class="product_banner">
      <div class="banner1" v-show="nowid==1">
        <div>
          <h4>MVP实践</h4>
          <p>业务的线上线下一体化成为趋势，特别是对于传统业务已经</p>
          <p>很成熟的企业。企业不需要管理一个至少10人左右的开发团</p>
          <p>队，因为他会让你的成本增加很多，我们会帮助你梳理业</p>
          <p>务， 提供完整的线上解决方案。</p>
        </div>
      </div>
      <div class="banner2" v-show="nowid==2">
        <div>
          <h4>传统企业+互联网</h4>
          <p>业务的线上线下一体化成为趋势</p>
          <p>特别是对于传统业务已经很成熟的企业</p>
          <p>企业不需要管理一个至少10人左右的开发团队，因为他会让你的成本增加很多</p>
          <p>我们会帮助你梳理务， 提供完整的线上解决方案。</p>
        </div>
      </div>
      <div class="banner3" v-show="nowid==3">
        <div>
          <h4>快速迭代</h4>
          <p>业务的线上线下一体化成为趋势，特别是对于传统业务已经</p>
          <p>很成熟的企业。企业不需要管理一个至少10人左右的开发团</p>
          <p>队，因为他会让你的成本增加很多，我们会帮助你梳理业</p>
          <p>务， 提供完整的线上解决方案。</p>
        </div>
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
    return {
      nowid: 1
    };
  },
  computed: {},
  methods: {
    change(id) {


      
      this.nowid = id;
    }
  }
};
</script>
<style lang="scss" scoped>
.product_root {
  margin: 180px auto 0;
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
}
.title {
  color: #4a4a4a;
  margin-top: 50px;
}
.product_main {
  margin-top: 60px;
  li {
    display: inline-block;
    position: relative;
    cursor: pointer;
    img {
      width: 100px;
      height: 100px;
    }
    .product_icon {
      position: absolute;
      bottom: -80px;
      right: 10px;
      width: 0;
      height: 10px;
      border-width: 40px;
      border-style: solid;
      border-color: transparent transparent #1a2a57 transparent;
    }
  }
  li:nth-child(2) {
    margin: 0 100px;
  }
  h5 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 25px;
  }
}
.product_banner {
  width: 100%;
  height: 400px;
  margin-top: 80px;
  position: relative;
  div {
    width: 100%;
    height: 400px;
  }
  .banner1,
  .banner2,
  .banner3 {
    div {
      overflow: hidden;
      width: 70%;
      margin: 0 auto;
      color: #fff;
      text-align: left;
      h4 {
        margin-top: 120px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 20px;
      }
      p {
        line-height: 30px;
      }
    }
  }
  .banner2 {
    div {
      text-align: right;
    }
  }
  .banner1 {
    background: url("../../img/lunbo1.jpg") no-repeat;
    background-size: 100% ;
  }
  .banner2 {
    background: url("../../img/lunbo2.jpg") no-repeat;
    background-size: 100% ;
  }
  .banner3 {
    background: url("../../img/lunbo3.jpg") no-repeat;
    background-size: 100% ;
  }
}
</style>
