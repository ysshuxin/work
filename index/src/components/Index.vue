<template>
<div id="root">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">科银资本</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul class="navbar-right navbar-nav ">
      <li class="nav-item" v-for="item in data.item">
        <a class="nav-link" href="#">{{item}}</a>
      </li>
    </ul>
  </div>
</nav>
<div id="banner">
  <div class="jumbotron">
  <div class="container">
    <h2 class="banner_title">我们正在面向全球6个国家、15个城市、12个区块链细分行业进行全产业链布局</h2>
  </div>
</div>
</div>

<div id="aboutus">
  <h1 class="title">
    <span class="title-text">
      关于我们
    </span>
    </h1>

<div class="container-fluid ">
<div class="row classify">

  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
    <div class="inf">团队</div> 
  </div>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 inf-title">
    <p>高学历、海龟、金融、计算机背景、银行、证券、上市公司等</p> 
  </div>
</div>
<div class="row classify">
  
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 inf-title">
   <p>澳大利亚第一家具备数字货币金融牌照的投资公司管理的基金实力</p> 
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
    <div class="inf">实力</div> 
  </div>
  
</div><div class="row classify">
  
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
    <div class="inf">生态</div> 
  </div>
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 inf-title">
    <p>全产业链布局</p> 
  </div>
</div>
</div>
</div>

<div id="dev">
  <h2 class="title">
    <span class="title-text">
      集团发展
    </span>
    </h2>
</div>

<div id="layout">
  <h2 class="title">
    <span class="title-text">
      投资布局
    </span>
    </h2>

<div class="container-fluid ">
<div class="row classify">
<layout></layout>
<layout></layout>
<layout></layout>
<layout></layout>
</div>
<div class="row classify">
<layout></layout>
<layout></layout>
<layout></layout>
<layout></layout>
</div>
<div class="row classify">
<layout></layout>
<layout></layout>
<layout></layout>
<layout></layout>
</div>
<div class="row classify">
<layout></layout>
<layout></layout>
<layout></layout>
<layout></layout>
</div>  
</div>
</div>

<div id="foundingtime">
<h2 class="title">
    <span class="title-text">
      集团发展
    </span>
    </h2>
<div class="row classify">
<foundingtime></foundingtime>
<foundingtime></foundingtime>
<foundingtime></foundingtime>
</div>
<div class="row classify">
<foundingtime></foundingtime>
<foundingtime></foundingtime>
<foundingtime></foundingtime>
</div>
<div class="row classify">
<foundingtime></foundingtime>
<foundingtime></foundingtime>
<foundingtime></foundingtime>
</div>
</div>

<div id="idea">
  <div class="jumbotron">
  <div class="container">
    <h3 class="banner_title text-center">信仰  坚持  专注  专业</h3>
  </div>
</div>
</div>

<div id="brandconcept">
  <h1>品牌理念</h1>
</div>

</div>

</template>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#root{
  height: 100%;
}
// #banner{
//   height: 100%;
//   .jumbotron{
//     height: 100%;
//   }
// }
#aboutus{
  .title{
    text-align: center;
    margin-bottom: 60px;
    .title-text{
      position: relative;
      padding-bottom: 20px;
    }
    .title-text::after{
      content: " ";
      width: 60%;
      height: 8px;
      display: block;
      background: #000;
      position: absolute; 
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
    }
  }
  .classify{
   
    margin: 40px 0;
    .inf{
      width: 200px;
      height: 200px;
      background: #000;
      color: #fff;
      line-height: 200px;
      text-align: center;
    }
   
  }
}

#dev{
  background: #000;
  .title{
    text-align: center;
    margin-bottom: 40px;
    color: #fff;
  }
}
#layout{
  .title{
    text-align: center;
    margin-bottom: 40px;
  }
  .classify{
    padding: 0 20px;
  }
  .inf{
    text-align: center;
    
    padding: 40px;
    .inf-in{
      height: 200px;
       background: pink;
       line-height: 200px;
    }
  }
}
#foundingtime{
  padding: 30px 0;
  
  background: #000;
  color: #fff;
  .title{
    text-align: center;
    margin-bottom: 40px;
  }
  .inf{
    text-align: center;
    padding: 40px;
    .inf-in{
      height: 200px;
       
       dd{
         height: 200px;
         background: yellow;
         margin-bottom: 0;
       }
       dt{
         background: #fff;
         color: #000;
       }
    }
  }
}
#idea{
  .banner_title{
     color: #fff;
     padding: 100px 0;
  }
}
#brandconcept{
  padding: 40px 0;
  text-align: center;
}
</style>
<script>



export default {
  


  name: "Index",
  
  data(){
      return {
          data:{
              item:["关于我们","投资布局","投行服务","团队","工作机会","咨询","品牌"],
              id:["aboutus","layout","#","#","#","#","idea"]
              }
      }
  },
  components:{
    "layout":{
      template:'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 inf"><div class="inf-in">test</div></div>',
    },
    "foundingtime":{
      template:'<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 inf"><div class="inf-in"><dl><dd><img src="" alt=""></dd> <dt><p>Jacob Cheng</p><p>CEO</p></dt></dl></div></div>'
    }
  }
};
</script>
