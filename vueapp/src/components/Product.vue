<template>
  <div class='product'>
    <h4>{{ product.name }}</h4>
    <div>{{ product.description }}</div>
    <h4>{{ cost }}</h4>
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
  },
  computed: {
    cost: function() {
      return `$${(this.product.cents / 100).toFixed(2)}`;
    }
  },
};
</script>

<style scoped>
.product {
  border: 1px solid #00f;
}
</style>
