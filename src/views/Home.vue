<template>

<transition name="modal">
    <modal @refresh-data="refreshData" @close-modal="closeModal" :article="this.article" v-if="modalIsVisible"></modal>
</transition>

<transition name="modal">
    <add-modal @refresh-data="refreshData" @close-add-modal="closeAddModal" v-if="addModalIsVisible"></add-modal>
</transition>

<div v-if="user">
  <h1 class="text-center">Hello {{ user.name }}</h1>
  <article-list ref="articleComponent"  @show-add-modal="showAddModal" @show-modal="showModal" ></article-list>
</div>
 
 <h1 v-else class="text-center">You are not logged in</h1>

</template>

<script>
import { mapGetters } from 'vuex';
import ArticleList from '../components/Table/ArticleList.vue';
import Modal from "../components/Modal/EditArticleModal.vue";
import AddModal from '../components/Modal/AddArticleModal.vue';

export default {
  name: 'Home',
  data () {
    return {
      modalIsVisible:false,
      addModalIsVisible:false,
      article:{}  
    }
  },
  components: {
    ArticleList,
    Modal,
    AddModal
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    showModal(article)
    {
      this.modalIsVisible = true;
      this.article = article;
    },
    closeModal()
    {
      this.modalIsVisible = false;
    },
    refreshData()
    {
      this.$refs.articleComponent.getData();
    },
    showAddModal()
    {
      this.addModalIsVisible = true;
    },
    closeAddModal()
    {
       this.addModalIsVisible = false;
    }
  }
}

</script>

<style scoped>
.modal-enter-from{
  opacity: 0;
  
}
.modal-enter-to,.v-leave-from{
  opacity: 1;
  
}
.modal-enter-active,.modal-leave-active{
  transition: all 0.5s;
}
.modal-leave-to{
  opacity: 0;
}

</style>
