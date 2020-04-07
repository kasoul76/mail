import Vuex from "vuex"
import Vue from "vue"
import mutations from "./mutaions"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations,
  actions,
  getters
})

export default store
