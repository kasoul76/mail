<template>
<div>
  <tab-bar>

    <tab-bar-item link="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"/>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    
    <tab-bar-item link="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg"/>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
   
 
  </tab-bar>
</div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue"
import TabBarItem from "components/common/tabbar/TabBarItem.vue"
export default {
  name: 'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
