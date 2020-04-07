<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
     <scroll class="content"
            :probe-type='3' 
            :pull-up-load='true' 
            ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />
    
  </div>
</template>

<script>
import  Scroll from "components/common/scroll/Scroll"
import  NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
import {mapGetters} from "vuex"
export default {
  name: 'Cart',
  components:{
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length:'cartLength'
    })
  },
  methods:{
    
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart{
  height: 100vh;
}
.cart-nav-bar{
  background: hotpink;
  color: #fff;
}
.content{
  /* position: absolute;
  top: 45px;
  bottom: 93px;
  left: 0;
  right: 0; */
  height: calc(100% - 45px - 49px - 44px);
  overflow: hidden;
}
</style>
