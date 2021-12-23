<template>
  <div>
    <spinner v-if="loading"></spinner>
    <div class="overlay"></div>
    <!-- Modal -->
    <div id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <button
              @click="closeModal"
              type="button"
              class="close"
              data-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title" id="myModalLabel">Add article</h4>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form role="form">
              <div class="form-group">
                <label>Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="data.title"
                />
                <span
                  v-if="formError.title"
                  style="color: crimson"
                  class="help-block"
                  >{{ formError.title ? formError.title[0] : "" }}
                </span>
              </div>

              <div class="form-group">
                <label for="exampleFormControlTextarea1"
                  >Article description</label
                >
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="data.description"
                ></textarea>
                <span
                  v-if="formError.description"
                  style="color: crimson"
                  class="help-block"
                  >{{ formError.description ? formError.description[0] : "" }}
                </span>
              </div>
            </form>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button
              @click="closeModal"
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
            >
              Close
            </button>
            <button @click="handleSubmit" type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addModal",
  data() {
    return {
      data: {
        title: "",
        description: "",
      },
      loading: false,
      formError: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-add-modal");
    },
    async handleSubmit() {
        this.loading = true;
      try {
        const response = await axios.post("api/manage/article", this.data);
        console.log(response.data);
        this.loading = false;

        this.$store.dispatch("flash", {
            message: "Article added successfully",
            type: "success",
          });

        this.$emit('close-add-modal');
        this.$emit('refresh-data');
        
      } catch (error) {

        if (error.response.data.validation_errors) {
          this.formError = error.response.data.validation_errors;
        } else {
          this.$store.dispatch("flash", {
            message: "An error occured",
            type: "danger",
          });
        }

        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
#myModal {
  z-index: 11;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-dialog {
  width: 800px !important;
}
textarea {
  resize: none;
}
</style>