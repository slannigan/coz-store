<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
}

.error {
  background-color: #f00;
  color: #fff;
  padding: 0.5rem 1rem;
}
</style>
