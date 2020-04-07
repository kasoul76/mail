<template>
  <div id="detail">
    <detail-nav-bar ref='navbar' @titleClick="titleClick"/>
    <scroll class="content"
            :probe-type='3'
            :pull-up-load='true'
            ref="scroll"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info  :detail-info="detailInfo" @GoodsImgLoad="GoodsImgLoad"/>
      <detail-param-info ref="param"  :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop" ></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"
import GoodsList from "components/content/goods/GoodsList.vue"

import Scroll from "components/common/scroll/Scroll.vue"


import {debounce} from "../../common/utils.js"
import {itemListenerMixin,backTopMixin} from "../../common/mixins.js"
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from "network/detail.js"
import { mapActions} from "vuex"
export default {
  name: 'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],

    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  created(){

    this.iid=this.$route.query.iid
    //根据iid请求数据
    getDetail(this.iid).then(res=>{
      const data=res
      //轮播图
      this.topImages=data.topImages
      //商品信息
      this.goods=new Goods(data.itemInfo,data.normalPrice,data.itemServices)

      //店铺信息
      this.shop=new Shop(data.shopInfo)
      //商品详细信息
      this.detailInfo=data.detailInfo
      //参数信息
      this.paramInfo=new GoodsParams(data.itemParams)
      //评论
      if(data.rateInfo.cRate !== 0){
        this.commentInfo=data.rateInfo.list[0]
      }



        this.getThemeTopY=debounce(()=>{
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)

      },300)
    })

    //请求推荐
    getRecommend().then(res=>{
      this.recommends=res
    })

  },
  mounted(){

  },
  destoryed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  updated(){
  },
  methods:{
    ...mapActions(['addCart']),
    //加载图片
    GoodsImgLoad(){
      this.refresh()
      // this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    //导航栏点击
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500)
    },
    contentScroll(position){
      //滚动时主题也改变
      const positionY=-position.y
      let length =this.themeTopY.length
      for(let i=0 ;i<length-1;i++){
        if(this.currentIndex != i &&  this.themeTopY[i]<=positionY && this.themeTopY[i+1]>positionY) {
          this.currentIndex=i
          this.$refs.navbar.currentIndex=i
        }
      }
      //回到顶部
      this.isShowBackTop=Math.abs(position.y)>1500

    },
    //添加购物车
    addToCart(){
      //获取购物车要显示的信息
      const product={}
      product.iid=this.iid
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.newPrice
      product.image=this.topImages[0]


      this.addCart(product).then(res=>{
        
      })

    }
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.content{

  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
