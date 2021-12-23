<template>

    <spinner v-show="loading" ></spinner>  
    
    <div class="container">
      <h1 class="text-center">Reset password</h1>
  
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="user.email"
          />
  
          <span v-if='errors.email' style="color: crimson" class="help-block">{{ errors.email[0] ? errors.email[0] : "This email  dosen't exists" }}</span>
          <span v-if='emailExistError' style="color: crimson" class="help-block">{{ emailExistError }}</span>
        </div>
  
        <button type="submit" class="btn btn-sm">
          Reset Password
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {
          email: "",
        },
        errors: [],
        emailExistError:"",
        loading: false,
      };
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        try {
          const response = await axios.post("api/auth/forgot", this.user);
          console.log(response);
          this.loading = false;
          this.$store.dispatch('flash',{message:"Email sent, Please check your email",type:'success'});
        } catch (error) {
         
          if(error.response.data.validation_errors)
          {
            this.errors = error.response.data.validation_errors;
          }else{
            this.emailExistError = "Email dosen't exists";
          }
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style>

  </style>