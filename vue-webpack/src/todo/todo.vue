<template>
  <div class="xain">
    <input v-model="content" @keyup.enter="todofun" placeholder="请输入内容">
    <div>
      {{content}}
    </div>
  </div>
</template>
<script>
import '../assets/styles/todo.styl'
//注意事项：styl 样式不支持在组件内写，需要以文件形式引入
export default {
  data(){
    return {
      content:'内容展示'
    }
  },
  methods:{
    todofun(){
      console.log(this.content)
    }
  }
}
</script>