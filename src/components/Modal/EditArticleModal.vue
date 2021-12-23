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
            <h4 class="modal-title" id="myModalLabel">Edit article</h4>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form role="form">
              <div class="form-group">
                <label>Title</label>
                <input
                  ref="title"
                  :value="article.title"
                  type="text"
                  class="form-control"
                  placeholder="Title"
                />
                <span
                  v-if="formError.title"
                  style="color: crimson"
                  class="help-block"
                  >{{ formError.title ?  formError.title[0] : ""}}
                  </span>
              </div>

              <div class="form-group">
                <label for="exampleFormControlTextarea1"
                  >Article description</label
                >
                <textarea
                  :value="article.description"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  ref="description"
                ></textarea>
                <span
                  v-if="formError.description"
                  style="color: crimson"
                  class="help-block"
                  >{{ formError.description ?  formError.description[0] : ""}}
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
            <button
              :data-id="article.id"
              @click="saveChanges"
              type="button"
              class="btn btn-primary"
            >
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
  name: "Modal",
  props: ["article"],
  emits: ["close-modal","refresh-data"],
  data() {
    return {
      loading: false,
      formError: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    async saveChanges(e) {
      this.loading = true;
      let data = {
        title: this.$refs.title.value,
        description: this.$refs.description.value,
      };
      try {
        const response = await axios.put(
          "api/manage/article/" + e.target.dataset.id,
          data
        );
        console.log(response.data);
        this.$store.dispatch("flash", {
          message: "Article updated successfuly",
          type: "success",
        });
        this.closeModal();
        this.loading = false;
        this.$emit('refresh-data');

      } catch (error) {
        if (error.response.data.validation_error) {
          this.formError = error.response.data.validation_error;
        }
        else{

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