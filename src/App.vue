<template>
  <the-nav></the-nav>
  <router-view></router-view>
</template>

<script>
import TheNav from './components/Nav/TheNav.vue';

export default{
  components: {
    TheNav
  }
}
</script>


<style>
body {
  font-family: 'PT Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #4f5d6e;
  position: relative;
  background: rgb(40,76,117);

}
h1{
  color: whitesmoke;
}
</style>
