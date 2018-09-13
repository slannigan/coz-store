<template>
  <div class="main">
    <Nav
      v-bind:itemsInCart='cart.length' />
    <h1>Main Page</h1>
    <ProductList
      v-bind:itemsInCart='cart.length'
      v-on:add-to-cart='addToCart' />
    <Cart
      v-bind:cart='cart' />
  </div>
</template>

<script>
import Cart from './Cart.vue';
import Nav from './Nav.vue';
import ProductList from './ProductList.vue';

export default {
  name: 'MainPage',
  components: {
    Cart,
    Nav,
    ProductList
  },
  data: function() {
    return {
      cart: [],
      itemsInCart: 1
    };
  },
  methods: {
    addToCart: function(product) {
      this.cart.push(product);
    }
  }
};
</script>

<style>
</style>
