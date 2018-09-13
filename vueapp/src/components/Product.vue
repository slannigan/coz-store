<template>
  <div class='product'>
    <h4>{{ product.name }}</h4>
    <button
      v-on:click="$emit('add-to-cart')">
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  }
};
</script>

<style scoped>
.product {
  border: 1px solid #00f;
}
</style>
