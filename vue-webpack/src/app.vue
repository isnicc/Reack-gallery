<template>
  <div class="app">
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import Todo from './todo/todo.vue'
import Footer from './todo/footer.jsx'
export default {
  data(){
    return {
      test:'this is web test!'
    }
  },
  components:{
    Todo,
    Footer
  },
  created(){
    console.log('3333')
  }
}
</script>
<style>
.app{
  color:red;
}
</style>