<template>
  <div class='container'>
    <div id='shop' class='product-list-container'>
      <h3 v-if="showLoading" class="empty-container content-container">Loading...</h3>
      <h3 v-else-if="error" class="empty-container content-container">
        An error occurred. Please try again later, or contact us at support@citizenofzion.com if problems continue.
      </h3>
      <Product v-else
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
        v-bind:products="products"
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
      loading: true
    };
  },
  props: {
    products: Array
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
        this.$emit('set-products', response.data.products);
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        this.loading = false;
      });
  }
};
</script>

<style scoped>
.product-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3rem;
}

.empty-container {
  padding: 1rem;
  margin: 0 1rem;
  max-width: 500px;
}

h2 {
  color: #fff;
}
</style>
