<template>
  <div class="nav">
    <div class='container'>
      <h3>Citizen of Zion Store</h3>
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
  border-bottom: 1px solid #f00;
}

h3 {
  display: inline-block;
}

.container {
  display: flex;
  justify-content: space-between;
}
</style>
