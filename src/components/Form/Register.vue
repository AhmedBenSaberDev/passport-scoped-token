  <template>

    <spinner v-if="loading"></spinner>

  <div class="container">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="data.name"
        />
        <span style="color: crimson" class="help-block">{{
          displayError("name")
        }}</span>
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          v-model="data.email"
        />
        <span style="color: crimson" class="help-block">{{
          displayError("email")
        }}</span>
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
          displayError("password")
        }}</span>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword2">Password Confirm</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password Confirm"
          v-model="data.password_confirm"
        />
        <span style="color: crimson" class="help-block">{{
          displayError("password_confirm")
        }}</span>
      </div>

      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      },
      formError: [],
      loading:false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const response = await axios.post("api/auth/register", this.data);
        this.$store.dispatch('flash',{message:"Account created successfuly",type:'success'});
        this.$router.push({ name: "login" });
        console.log(response)
        this.loading = false;
        
      } catch (error) {
        this.formError = error.response.data.form_validation;
        this.loading = false;
      }
    },
    displayError(field) {
      if (this.formError[field]) {
        return this.formError[field][0];
      }
      return;
    }
  },
};
</script>

<style scoped>
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

</style>
