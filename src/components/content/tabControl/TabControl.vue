<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="index" class="tab-control-item" 
      :class="{active:index===currentIndex} "
      @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TabControl',
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    changeIndex(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  },
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  }
  
}
</script>

<style scoped>
.tab-control{
  text-align: center;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control span{
  padding:5px;
}
.active{
  color:brown;
}
.active span{
  border-bottom:3px solid brown;
}
</style>
