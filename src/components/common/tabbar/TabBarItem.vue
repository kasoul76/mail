<template>

  <div class='tabbar-item' @click="changelink">
    <slot v-if="!isActived"  name="item-icon"></slot>
    <slot v-else  name="item-icon-active"></slot>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  computed:{
    isActived(){
      return this.$route.path.indexOf(this.link)!=-1
    },
    activestyle(){
      return this.isActived?{color:this.color}:{}
    }
  },
  props:{
    link:String,
    color:{
      type:String,
      default:"red"
    }
  },
  methods:{
    changelink(){
      this.$router.push(this.link)
      
    }
  }
}
</script>

<style scoped>
.tabbar-item{
  flex:1;
  text-align:center;
  height:49px;
  font-size:14px;
}
.tabbar-item img{
  width:23px;
  height:23px;
  vertical-align:top;
  margin:3px auto;
}
</style>
