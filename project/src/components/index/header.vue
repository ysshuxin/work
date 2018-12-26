<template>
  <div id="header_root" class="header_root">
    <div class="header_main">
      <div class="logo">
        <ul>
          <li class="logo_img">
            <img
              src="http://cdn.duitang.com/uploads/item/201405/23/20140523170544_tCewW.thumb.700_0.jpeg"
              alt
            >
          </li>
          <li class="logo_text">{{logo}}</li>
        </ul>
      </div>

      <el-menu
       
        class="el-menu-demo"
        mode="horizontal"
        
        text-color="rgba(0,0,0,0.85)"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">产品开发</el-menu-item>
        <el-menu-item index="3">服务托管</el-menu-item>
        <el-menu-item index="4">咨询</el-menu-item>
        <el-menu-item index="5">客户</el-menu-item>
        <el-menu-item index="6">关于我们</el-menu-item>
      </el-menu>
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
.header_root {
  margin: 0 auto;
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 10000;
  background: #fff;
}
.header_main{
  width: 70%;
  margin: 0 auto;
}
.logo {
  float: left;
  line-height: 60px;
  overflow: hidden;
  li {
    float: left;
  }
  .logo_img {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}

.el-menu.el-menu--horizontal {
  border: none;
  float: right;
}
</style>
