<template>

<spinner v-show="loading" ></spinner>  

    <div class="container">
    <h1 class="text-center">Reset Password</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="data.password"
        />

        <span v-if="formErrors" style="color: crimson" class="help-block">{{ formErrors.password ? formErrors.password[0] : ""}}</span>
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Password Confirm</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password Confirm"
          v-model="data.password_confirm"
        />

        <span v-if="formErrors" style="color: crimson" class="help-block">{{ formErrors.password_confirm ? formErrors.password_confirm[0] : "" }}</span>
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
    data () {
        return {
            data:{
                password:'',
                password_confirm:'',
                token:''
            },
            formErrors:null,
            loading:false
        }
    },
    methods: {
        async handleSubmit()
        {
            this.loading = true;
            
            try {
               
              console.log(this.data);
              const response = await axios.post('api/auth/reset',this.data);
              console.log(response.data);
              this.loading = false;
              this.$router.push({name:"login"});
              this.$store.dispatch('flash',{message:"Password has been changed successfully",type:'success'});
               
            } catch (error) {
                if(error.response.data.validation_errors)
                {
                    this.formErrors = error.response.data.validation_errors;
                }else if(error.response.data.message == "Token dosen't match")
                {

                    this.$store.dispatch('flash',{message:"Token dosen't match",type:'danger'});
                }else
                {
                    this.$store.dispatch('flash',{message:"An error occured , Please try again",type:'danger'});
                }
                this.loading = false;
            }
           
        }
    }, 

    mounted () {
       this.data.token = this.$route.params.token;
    }
}
</script>

<style>

</style>