<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item" />
  </div>
</template>

<script>
import CartListItem from "./CartListItem"
import {mapGetters} from "vuex"
export default {
  name: 'CartList',
  components:{
    CartListItem
  },
  computed:{
    //两种语法
    ...mapGetters(['cartList'])
   
  }
}
</script>

<style scoped>
</style>
