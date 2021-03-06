import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import Flash from './flash.js';

export default createStore({
  state(){
    return{
      user:null,
    }
  },
  getters: {
    user(state){
      return state.user;
    }
  },
  mutations: {
    user(state,user){
      state.user = user;
    }
  },
  actions: {
    user(context,user){
      context.commit('user',user);
    }
  },
  modules: {
    Flash
  },
  plugins: [createPersistedState()],
})
