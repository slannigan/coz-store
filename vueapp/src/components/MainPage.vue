<template>
  <div class="main">
    <Nav
      v-bind:itemsInCart='cart.length' />
    <h1>Main Page</h1>
    <ProductList
      v-on:add-to-cart='addToCart' />
    <Cart
      v-bind:cart='cart'
      v-on:clear-cart='clearCart'
      v-on:remove-from-cart='removeFromCart' />
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
      isLocalStorageAvailable: false
    };
  },
  methods: {
    addToCart: function(product) {
      if (!product.grams) {
        const alreadyPurchased = !!this.cart.find((otherProduct) => {
          return otherProduct.id === product.id;
        });
        if (alreadyPurchased) {
          return alert(`You can only purchase one ${product.name}.`);
        }
      }
      this.cart.push(product);
      this.updateLocalStorage();
    },
    clearCart: function() {
      this.cart = [];
      this.updateLocalStorage();
    },
    removeFromCart: function(product) {
      this.cart.splice(this.cart.indexOf(product), 1);
      this.updateLocalStorage();
    },
    updateLocalStorage: function() {
      if (this.isLocalStorageAvailable) {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  },
  mounted() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      this.isLocalStorageAvailable = true;
    } catch (e) {
      // don't need to do anything if this failed
    }

    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }
};
</script>

<style>
</style>
