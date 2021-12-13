<template>
 <h1 v-if="user"  class="text-center">Hello {{ user.name }}</h1>
 <h1 v-else class="text-center">You are not logged in</h1>
 
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['user'])
  }
}

</script>
