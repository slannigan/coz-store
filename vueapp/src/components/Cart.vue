<template>
  <div class="cart container">
    <h2>Cart</h2>
    <div
      v-for="product in cart">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: Array
  }
}
</script>

<style scoped>
.container {
  border: 1px solid #f00;
  margin-top: 2rem;
  max-width: calc(1024px - 2rem);
  padding: 1rem;
  text-align: left;
  width: calc(100% - 2rem);
}
</style>
