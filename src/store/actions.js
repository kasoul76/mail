export default {
  addCart(context,payload){
    return new Promise((res,rej)=>{
      let oldProduct =null 
      oldProduct = context.state.cartList.find(item=>item.iid==payload.iid)
      if(oldProduct){
        //数量加一
        context.commit("addcounter",oldProduct)
        res('数量加一')
      }else{
        //加入到购物车
        payload.count=1
        context.commit("addToCart",payload)
        res('加入购物车')
      }
    })
    
  }
}