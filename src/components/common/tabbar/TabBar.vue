<template>
<div id='tabbar'>
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'TabBar'
}
</script>

<style scoped>
#tabbar{
  display:flex;
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background-color:#eee;
  z-index: 99;
}

</style>
