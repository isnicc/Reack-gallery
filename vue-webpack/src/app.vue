<template>
  <div class="app">
  {{test}}
  </div>
</template>
<script>
export default {
  data(){
    return {
      test:'this is web test!'
    }
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