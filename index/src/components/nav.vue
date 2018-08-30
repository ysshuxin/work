<template>
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
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
    name:"Nav",
    data(){
        return{
            item:["关于我们","投资布局","投行服务","团队","工作机会","咨询","品牌"],
              id:["aboutus","layout","#","#","#","#","idea"]
        }
    }
}
</script>
