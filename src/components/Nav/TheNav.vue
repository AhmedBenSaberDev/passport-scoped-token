<template>
  <div class="body-wrap">

    <nav class="navbar navbar-inverse" role="navigation">

        <div v-if="user" class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <ul class="nav navbar-nav navbar-right">
             <li> <a @click.prevent="logout" href='#'>Logout</a> </li>
          </ul>
        </div>

        <div v-else class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <ul class="nav navbar-nav navbar-right">
             <li> <router-link :to="{name:'login'}" >Login</router-link> </li>
            <li> <router-link :to="{name:'register'}" >Register</router-link> </li>
          </ul>
        </div>

    </nav>

</div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';


export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async logout()
    {
      try {
        const response = await axios.get('logout');
        console.log(response);
        localStorage.removeItem('token');
        this.$store.dispatch('user',null);
        this.$router.push({name:'login'});
      } catch (error) {
        return
      }
    }
  }
}
</script>

<style scoped>

nav {
  box-shadow: 5px 4px 5px #000;
}
.navbar-right{
    padding-right:50px !important;
}
</style>