<template>
  <spinner v-if="loading" ></spinner>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          v-model="data.email"
        />
         <span style="color: crimson" class="help-block">{{
         
        }}</span>
        <span style="color: crimson" class="help-block" v-if='invalidCredentials'>
          {{invalidCredentials}} </span>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="data.password"
        />
         <span style="color: crimson" class="help-block">{{
         
        }}</span>
        <span style="color: crimson" class="help-block" v-if='invalidCredentials'>
          {{invalidCredentials}} </span>
      </div>


      <button type="submit" class="btn btn-default">Submit</button>
      <router-link class="forgot" :to='{ name:"forgot"}'>forgot password ?</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SecureLS from "secure-ls";
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
       formError:[],
       invalidCredentials:null,
       loading:false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await axios.post("api/auth/login", this.data);

        let ls = new SecureLS();
        ls.set('token',response.data.token);

        this.$store.dispatch('user',response.data.user);

        this.loading = false;
        this.$router.push({name:'home'});
        
      } catch (error) {
        if(error.response.data.validation_errors){
            this.formError = error.response.data.validation_errors;
        }else{
            this.invalidCredentials = 'Invalid email or Password';
        }
        this.loading = false;
      }
    },
    displayError(field) {
      if (this.formError[field]) {
        return this.formError[field][0];
      }
      this.formError = [];  
      return "";
    }
  }
};
</script>

<style >
.container {
  margin: 5% auto;
  padding: 3%;
  max-width: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: rgb(44, 77, 117);
}
label {
  color: rgb(233, 230, 230);
}
input {
  border: 3px solid;
}
.forgot{
  float: right;
  color: whitesmoke;
  font-size: 18px;
}
</style>