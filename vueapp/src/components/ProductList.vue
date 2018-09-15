<template>
  <div class='container'>
    <h2>Product List</h2>
    <div class='product-list-container'>
      <h3 v-if="showLoading">Loading...</h3>
      <Product v-else
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
        v-on:add-to-cart="$emit('add-to-cart', product)" />
    </div>
  </div>
</template>

<script>
import Product from './Product.vue';
const axios = require('axios');

export default {
  name: 'ProductList',
  components: {
    Product
  },
  data: function() {
    return {
      error: false,
      forceShowLoading: true,
      loading: true,
      products: []
    };
  },
  computed: {
    showLoading: function() {
      return this.forceShowLoading || this.loading;
    }
  },
  mounted() {
    // Force loader to show for at least some time
    setTimeout(() => {
      this.forceShowLoading = false;
    }, 1000);
    // Get products
    axios
      .get(`${process.env.API_URL}/products`)
      .then((response) => {
        this.products = response.data.products;
      })
      .catch((error) => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
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
