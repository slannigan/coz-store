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
  padding: 0.5rem;
}

h3 {
  display: inline-block;
  margin: 0;
}

.container {
  text-align: right;
}

h3.coz {
  color: #db052a;
  text-shadow: 0px 0px 1px #fff;
}
</style>
