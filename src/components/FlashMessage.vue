<template>
  <div class="container-flash">
    <div :class="setType" class="alert alert-dismissible show" role="alert">
      {{ flashMessage.message }}
      <button @click="deleteFlash" class="btn btn-info">ok</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data(){
    return {
      danger:"alert-danger",
      success:"alert-success"
    }
  },
  name: "Flash",
  methods: {
    deleteFlash() {
        this.$store.dispatch('flash',null)
    },
  },
  computed: {
    setType()
    {
      if(this.flashMessage.type == "danger")
      {
        return this.danger;
      }else{
        return this.success;
      }
      
    },
    ...mapGetters(['flashMessage'])
  }
};
</script>

<style scoped>
.container-flash {
  z-index:100;
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 30%;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>