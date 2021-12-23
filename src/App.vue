<template>

<transition>
  <flash-message v-if="flashMessage" :type="flashMessage.type" :message="flashMessage.message"></flash-message>
</transition>
  

  <the-nav></the-nav>
  <router-view></router-view>

</template>

<script>
import TheNav from "./components/Nav/TheNav.vue";
import FlashMessage from "./components/FlashMessage.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheNav,
    FlashMessage,
  },
  computed: {
    ...mapGetters(["flashMessage"]),
  },
  watch:{
    flashMessage(value){
      if(value != null)
      {
        let notif = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3");
        notif.play();
      }
      
    }
  }
}
</script>


<style>

body {
  font-family: "PT Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #4f5d6e;
  background: rgb(40, 76, 117);
}
h1 {
  color: whitesmoke;
}
.v-enter-from{
  margin-top: -50px;
  opacity: 0;
  
}
.v-enter-to,.v-leave-from{
  margin-top: 0;
  opacity: 1;
  
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s;
}
.v-leave-to{
  margin-top: -50px;
  opacity: 0;
}
</style>
