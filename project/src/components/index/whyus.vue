<template>
  <div class="whyus_root">
    <Title title="为什么选择我们" title-en="Why us?"></Title>
    <div class="whyus_main">
      <div class="whyus_item1">
        <div class="whyus_imgout">
          <img
            src="../../img/whyusbg1.png"
            alt
          >
        </div>

        <div class="whyus_txt">
          <h5>
            <span>降低成本</span>
          </h5>

          <p>互联网产品逐渐成为基础设施，</p>
          <p>无论它是一个品牌官网，还是业务承载，</p>
          <p>也无论你是中小企业还是大型企业，</p>
          <p>我们都可以为您提供专业的定制开发服务</p>
        </div>
      </div>
      <div class="whyus_item2">
        <div class="whyus_txt">
          <h5><span>专业的团队</span> </h5>

          <p>互联网产品逐渐成为基础设施</p>
          <p>无论它是一个品牌官网，还是业务承载也无论你是中小企业还是大型企业</p>
          <p>我们都可以为您提供专业的定制开发服务</p>
        </div>
        <div class="whyus_imgout">
          <img
            src="../../img/whyusbg2.png"
            alt
          >
        </div>
      </div>
      <div class="whyus_item1">
        <div class="whyus_imgout">
          <img
            src="../../img/whyusbg3.png"
            alt
          >
        </div>

        <div class="whyus_txt">
          <h5> <span>高效执行</span> </h5>

          <p>互联网产品逐渐成为基础设施，</p>
          <p>无论它是一个品牌官网，还是业务承载，</p>
          <p>也无论你是中小企业还是大型企业，我们都可以为您提供</p>
          <p>专业的定制开发服务</p>
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
  }
};
</script>
<style lang="scss" scoped>
.whyus_root {
  margin: 0 auto;
  width: 50%;
  min-width: 950px;
  overflow: hidden;
}
.whyus_main {
  margin-top: 60px;

  img {
    width: 340px;
    height: 320px;
  }
  .whyus_txt {
      margin-top: 90px;
    h5 {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      span{ 
          padding-bottom: 10px;
          display: inline-block;
          border-bottom: 2px solid #004FFF;
      }
    }
    p {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 0;
      line-height: 30px;
    }
  }
  .whyus_item1 {
    width: 100%;
    overflow: hidden;
    .whyus_imgout {
      float: left;
    }
    .whyus_txt {
      float: right;
      width: 350px;
    }
  }
  .whyus_item2 {
      margin: 36px 0;
    width: 100%;
    overflow: hidden;
    .whyus_imgout {
      float: right;
     
    }
    .whyus_txt {
        
      float: left; 
      text-align: right;
      
    }
  }
}
</style>
