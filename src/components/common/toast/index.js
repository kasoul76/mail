import Toast from "./Toast"
const obj={}

obj.install=function (Vue){
  //1.创建组件构造器
  const toastConstructor= Vue.extend(Toast)
  //2.创建实例
  const toast =new toastConstructor
  //3.手动挂载
  toast.$mount(document.createElement('div'))
  //4.toast.$el就是这个div
  document.body.appendChild(toast.$el)
  
  Vue.prototype.$toast=toast
}

export default obj