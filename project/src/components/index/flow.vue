<template>
  <div class="flow_root">
    <Title title="专业的开发管理流程" title-en></Title>
    <div class="flow_main">
      <ul>
        <li>
          <h5>产品咨询</h5>
          <p>通过产品咨询，产品经理会为</p>
          <p>您梳理需求提供产品解决方案</p>
          <p>以及原型设计</p>
          <div>
            <span>交付物：</span>
            <span>产品原型图</span>
          </div>
        </li>
        <li>
          <h5>UI设计</h5>
          <p>设计师根据产品特性和用户属</p>
          <p>性进行UI设计，提升产品的整</p>
          <p>体用户体验</p>
          <div>
            <span>交付物：</span>
            <span>设计稿</span>
          </div>
        </li>
        <li>
          <h5>产品开发</h5>
          <p>根据产品需求和原型，工程师</p>
          <p>进入开发阶段，规范的代码保</p>
          <p>障项目质量</p>
          <div>
            <span>交付物：</span>
            <span>源代码</span>
          </div>
        </li>
        <li>
          <h5>测试上线</h5>
          <p>通过内部测试和第三方专业测</p>
          <p>试及时发现修复bug， 顺利部</p>
          <p>署上线</p>
          <div>
            <span>交付物：</span>
            <span>正式版产品</span>
          </div>
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
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.flow_root {
  margin: 120px auto 0;
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  text-align: center;
}

.flow_main {
  margin-top: 50px;
  text-align: center;
  li {
    display: inline-block;
    margin: 0 -5px;
    text-align: left;
    padding: 0 30px;
    h5 {
      text-align: center;
      font-size: 16px;
      color: #000000;
      margin-bottom: 30px;
     margin-top: 40px;
    }
    p{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        line-height: 30px;
    }
    div{
        margin-top: 20px;
        text-align: center;
        span:nth-child(1){
            color: rgba(0,0,0,0.65);
        }
    }
  }
  li:nth-child(1){
      background: url("../../img/num1.png") no-repeat ;
      background-size: 67px 172px;
      background-position: 0 0;
      
  }
  li:nth-child(2){
      background: url("../../img/num2.png") no-repeat;
        background-size: 67px 172px;
      background-position: 0 0;
  }
  li:nth-child(3){
      background: url("../../img/num3.png") no-repeat;
        background-size: 67px 172px;
      background-position: 0 0;
  }
  li:nth-child(4){
      background: url("../../img/num4.png") no-repeat;
         background-size: 67px 172px;
      background-position: 0 0;
  }
}
</style>
