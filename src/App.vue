<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Register></Register>
  </div>
</template>

<script>
import Register from './components/Register.vue'
export default {
  components:{
    Register
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
