import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop.vue"

export const itemListenerMixin={
  data(){
    return { 
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    //GoodsListItem图片加载完成事件监听
    
    this.refresh=debounce(this.$refs.scroll.refresh,300)
    this.ItemImgListener=()=>{
      this.refresh()
    }
    this.$bus.$on("itemImgLoad",this.ItemImgListener)
  }
}


export const backTopMixin={
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  },
  components:{
    BackTop
  }
}