<template>
  <div class="nav">
    <div class='container'>
      <h3>Cart: {{ itemsInCart }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    itemsInCart: Number
  }
}
</script>

<style scoped>
.nav {
  color: #fff;
}

h3 {
  display: inline-block;
}

.container {
  text-align: right;
}
</style>
