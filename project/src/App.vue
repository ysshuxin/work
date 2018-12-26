<template>
  <div id="app">
   <Header></Header>
   <Banner></Banner>
   <Infourservre></Infourservre>
   <Whyus></Whyus>
   <Product></Product>
   <Flow></Flow>
   <Operations></Operations>
   <Case></Case>
   <Aboutus></Aboutus>
   <Contactus></Contactus>
   <Footer></Footer>
  </div>
</template>

<script>

import Header from './components/index/header'
import Banner from './components/index/banner'
import Infourservre from './components/index/inf_ourserve'
import Whyus from './components/index/whyus'
import Product from './components/index/product'
import Flow from './components/index/flow'
import Operations from './components/index/operations'
import Case from './components/index/case'
import Aboutus from './components/index/aboutus'
import Contactus from './components/index/contactus'
import Footer from './components/index/footer'

export default {
  name: 'app',
  components: {
    Header,
    Banner,
    Infourservre,
    Whyus,
    Product,
    Flow,
    Operations,
    Case,
    Aboutus,
    Contactus,
    Footer
  }
}
</script>

<style>
  #app{
    background: url("./img/bg.png") ;
    background-size: cover;
    height: 3000px;
  }
</style>
