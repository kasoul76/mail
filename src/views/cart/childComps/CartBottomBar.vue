<template>
  <div class="bottom-bar">
    <CheckButton class="check-all" @click.native="checkAllClick"  :is-check="isCheckAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}
    </span>
    <span class="calculate" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/common/checkButton/CheckButton'

	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    computed: {
		  totalPrice() {
        return this.$store.state.cartList
                .filter(item=>item.checked)
                .reduce((prev,item)=>prev+item.price*item.count,0)
                .toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>item.checked).length
      },
      isCheckAll(){
        if(this.$store.state.cartList.length==0) return false
        return !this.$store.getters.cartList.find(item => !item.checked)
        // return !(this.$store.getters.cartList.filter(item => !item.checked).length)   性能不高
      }
    },
    methods: {
      checkAllClick(){
        if(this.isCheckAll){
          //全选，变不选
          this.$store.state.cartList.map(item=>item.checked=false)
        }else{
          //有未选中的内容, 则全部选中
          this.$store.state.cartList.forEach(item=>item.checked=true)
        }

        //最终代码
        // this.$store.state.cartList.forEach(item=>item.checked=!this.isCheckAll)
      },
      calcClick(){
        if(!this.isCheckAll){
          this.$toast.show('请选择要购买的商品')
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    /* position: relative; */
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;

  }

  .bottom-bar .check-all {
    /*由于line-hight会继承，所以*/
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
    /* display: inline-block;
    vertical-align: middle;
    margin-right: 5px; */
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .calculate {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
