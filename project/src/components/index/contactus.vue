<template>
  <div class="us_root">
    <div class="us_main">
      <h3>联系我们</h3>
      <h5>Contact Us</h5>
      <p>
        <span class="left">电话：</span>
        <span class="right">18500447855</span>
      </p>
      <p>
        <span class="left">邮箱：</span>
        <span class="right">hi@lisatech.info</span>
      </p>
      <p>
        <span class="left">地址：</span>
        <span class="right">北京市东城区东直门外大街天恒大厦东侧小白楼2层</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.us_root {
  margin: 110px auto 0;
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  height: 400px;

  background: url("../../img/map.png") no-repeat ;
  background-size: 100% 100%;
}
.us_main {
  margin: 84px auto 0;
  width: 50%;
  min-width: 1000px;
  h3 {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
  h5 {
    font-size: 16px;
    color: #4a4a4a;
    font-weight: 500;
  }
  p {
    margin-top: 23px;
    .left {
      font-size: 16px;
      color: #4a4a4a;
    }
    .right {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
