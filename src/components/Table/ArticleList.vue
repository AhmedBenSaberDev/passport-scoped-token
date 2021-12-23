<template>

<spinner v-if="loading" ></spinner>

  <h2><button @click="showAddModal" class="btn btn-success">Add article</button></h2>
  <div class="table-wrapper">
    <table class="fl-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for="article in articles" :key="article.id">
          <td>{{article.id}}</td>
          <td>{{article.title}}</td>
          <td>{{article.description}}</td>
          <td> <button @click="showModal(article)" :data-id="article.id" class="btn btn-warning">Edit</button> <button @click="deleteArticle" :data-id="article.id" class="btn btn-danger">Delete</button> </td>
        </tr>

      </tbody>

      <tbody></tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArticleList",
  emits:['show-modal','show-add-modal'],
  data () {
    return {
      articles:[],
      loading:false,
    }
  },
  async created () {
    this.getData();  
    },
  methods: {
    async getData()
    {
      this.loading = true;
      try {
          const response = await axios.get('api/manage/article');
          this.articles = response.data.articles;
          this.loading = false;
      } catch (error) {
        this.$store.dispatch("flash", {
            message: "An error occured",
            type: "danger",
          });
          console.log(error.response); 
          this.loading = false;
      }
    },
    async deleteArticle(e)
    {
       this.loading = true;
      try{
        const response = await axios.delete('api/manage/article/'+e.target.dataset.id);
        console.log(response.data);
        this.loading = false;
        this.$store.dispatch('flash',{message:"Article deleted successfully",type:"success"});
        this.getData()
      }
     catch(error){
     if(error.response.status == 401)
     {
       this.$store.dispatch('flash',{message:"You are not allowed to delete articles",type:"danger"})
     }else{
        
        this.$store.dispatch('flash',{message:"An error occured",type:"danger"})
     }
      this.loading = false;
     }
    },
    showModal(article)
    {
      this.$emit('show-modal',article);
    },
    showAddModal()
    {
      this.$emit('show-add-modal');
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
body {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  background: rgba(71, 147, 227, 1);
}
h2 {
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  padding: 30px 0;
}

/* Table Styles */

.table-wrapper {
  margin: 10px 70px 70px;
  box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
}

.fl-table {
  border-radius: 5px;
  font-size: 15px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: white;
}

.fl-table td,
.fl-table th {
  text-align: center;
  padding: 8px;
}

.fl-table td {
  border-right: 1px solid #f8f8f8;
  font-size: 15px;
}

.fl-table thead th {
  color: #ffffff;
  background: #4fc3a1;
}

.fl-table thead th:nth-child(odd) {
  color: #ffffff;
  background: #324960;
}

.fl-table tr:nth-child(even) {
  background: #f8f8f8;
}

/* Responsive */

@media (max-width: 767px) {
  .fl-table {
    display: block;
    width: 100%;
  }
  .table-wrapper:before {
    content: "Scroll horizontally >";
    display: block;
    text-align: right;
    font-size: 11px;
    color: white;
    padding: 0 0 10px;
  }
  .fl-table thead,
  .fl-table tbody,
  .fl-table thead th {
    display: block;
  }
  .fl-table thead th:last-child {
    border-bottom: none;
  }
  .fl-table thead {
    float: left;
  }
  .fl-table tbody {
    width: auto;
    position: relative;
    overflow-x: auto;
  }
  .fl-table td,
  .fl-table th {
    padding: 20px 0.625em 0.625em 0.625em;
    height: 60px;
    vertical-align: middle;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    width: 120px;
    font-size: 13px;
    text-overflow: ellipsis;
  }
  .fl-table thead th {
    text-align: left;
    border-bottom: 1px solid #f7f7f9;
  }
  .fl-table tbody tr {
    display: table-cell;
  }
  .fl-table tbody tr:nth-child(odd) {
    background: none;
  }
  .fl-table tr:nth-child(even) {
    background: transparent;
  }
  .fl-table tr td:nth-child(odd) {
    background: #f8f8f8;
    border-right: 1px solid #e6e4e4;
  }
  .fl-table tr td:nth-child(even) {
    border-right: 1px solid #e6e4e4;
  }
  .fl-table tbody td {
    display: block;
    text-align: center;
  }
}
</style>