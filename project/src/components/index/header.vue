<template>
  <div id="header_root" class="header_root">
    <div class="header_main">
      <div class="logo">
        <ul>
          <li class="logo_img">
            <img
            :src="logo"
              alt
            >
          </li>
        </ul>
      </div>

      <el-menu
       
        class="el-menu-demo"
        mode="horizontal"
        
        text-color="rgba(0,0,0,0.85)"
      >
      
        <el-menu-item @click="turnHash($event,'banner_root')" index="1">首页</el-menu-item>
        <el-menu-item @click="turnHash($event,'product_root')" index="2">产品开发</el-menu-item>
        <el-menu-item @click="turnHash($event,'operations_root')" index="3">服务托管</el-menu-item>
        
        <el-menu-item @click="turnHash($event,'case_root')" index="5">商业案例</el-menu-item>
        <el-menu-item @click="turnHash($event,'about_root')"  index="6">关于我们</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import logo from '../../img/icon/logo.png'
export default {
  data: () => {
    return {
      logo: logo
    };
  },
  methods:{
    turnHash:function(e,id){
      
      window.location.hash=id
    }
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
      width: 80px;
      height: 40px;
   
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
