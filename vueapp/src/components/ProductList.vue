<template>
  <div class='container'>
    <h2>Product List</h2>
    <div class='product-list-container'>
      <Product
        v-for="product in products"
        v-bind:product="product"
        v-on:add-to-cart="$emit('add-to-cart', product)" />
    </div>
  </div>
</template>

<script>
import Product from './Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product
  },
  data: function() {
    return {
      products: [{
        name: 'Prod 1'
      }, {
        name: 'Prod 2'
      }, {
        name: 'Prod 3'
      }]
    };
  }
};
</script>

<style scoped>
.container {
  text-align: left;
}

.product-list-container {
  border: 1px solid #0f0;
  display: flex;
  justify-content: space-between;
}
</style>
