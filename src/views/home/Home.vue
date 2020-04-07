<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行','新款','精选']" ref="tabControlFixed"  @tabClick="tabClick" :class="{'tab-fixed':isTabFixed}"/>
    <scroll class="content" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"
             ref="scroll">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :title="['流行','新款','精选']" ref="tabControl"  @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" ></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommendView from "./childComps/RecommendView.vue"
import FeatureView from "./childComps/FeatureView.vue"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
import {getHomeMultidata,getHomeGoods} from "network/home.js"
import {debounce} from "../../common/utils.js"
import {itemListenerMixin,backTopMixin} from "../../common/mixins.js"
export default {
  name: 'Home',
  data(){
    return {
      banners:[],
      dKeywords:[],
      keywords:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,


  },
  created(){
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted(){


  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()


  },
  deactivated(){
    //保存位置
    this.saveY=this.$refs.scroll.scroll.y
    //取消监听
    this.$bus.$off('itemImgLoad',this.ItemImgListener)
  },
  methods:{
    /*
    *事件监听
    */
    tabClick(index){
      switch(index){
        case 0 : this.currentType='pop';break;
        case 1 : this.currentType='new';break;
        case 2 : this.currentType='sell';break;
      }
      this.$refs.tabControlFixed.currentIndex=index
      this.$refs.tabControl.currentIndex=index
    },


    //获取位置
    contentScroll(position){
      //判断backtop是否显示
      this.isShowBackTop=Math.abs(position.y)>1500
      //判断tabcontrol是否吸顶
      this.isTabFixed=Math.abs(position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
     this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
    },
    /*
    *网络请求
    */
    getHomeMultidata(){
      getHomeMultidata().then((res)=>{

        this.banners=res.data.banner.list
        this.dKeywords=res.data.dKeyword.list
        this.keywords=res.data.keywords.list
        this.recommends=res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
      })

    },

  },

}
</script>

<style scoped>
.home{
  position: relative;
  height: 100vh;
}
.home-nav{
  background-color: lightpink;
  color: #fff;

}
.tab-fixed{
  position: relative;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
}
</style>
