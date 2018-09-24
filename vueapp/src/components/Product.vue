<template>
  <div class='product content-container'>
    <div>
      <h3>{{ product.name }}</h3>
      <div>{{ product.description }}</div>
    </div>
    <div>
      <h4 v-if="product.cents">{{ cost }}</h4>
      <button
        v-on:click="$emit('add-to-cart')">
        Add to cart
      </button>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0.5rem 1rem;
  max-width: 100%;
  padding: 0.5rem 0.5rem 1.5rem;
  text-align: center;
  transition: 0.3s;
  width: 300px;
}
</style>
