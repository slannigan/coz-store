<template>
  <div class="main">
    <Nav
      v-bind:itemsInCart='cart.length' />
    <ProductList
      v-on:add-to-cart='addToCart' />
    <Cart
      v-bind:cart='cart'
      v-on:clear-cart='clearCart'
      v-on:remove-from-cart='removeFromCart'
      v-on:edit-product='editProduct' />
    <EditModal
      v-if='productToEdit'
      v-bind:product='productToEdit'
      v-on:done-edit='doneEdit' />
    <Footer />
  </div>
</template>

<script>
import Cart from './Cart.vue';
import EditModal from './EditModal.vue';
import Footer from './Footer.vue';
import Nav from './Nav.vue';
import ProductList from './ProductList.vue';

export default {
  name: 'MainPage',
  components: {
    Cart,
    EditModal,
    Footer,
    Nav,
    ProductList
  },
  data: function() {
    return {
      cart: [],
      isLocalStorageAvailable: false,
      productToEdit: null
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
      if (product.slug === 'donation') {
        return this.productToEdit = product;
      }
      product.cents_charged = product.cents;
      this.cart.push(product);
      this.updateLocalStorage();
    },
    doneEdit: function(newVal) {
      if (newVal) {
        const existsInCart = this.cart.indexOf(this.productToEdit) > -1;
        this.$set(this.productToEdit, 'cents_charged', newVal);
        if (!existsInCart) {
          this.cart.push(this.productToEdit);
        }
        this.updateLocalStorage();
      }
      this.productToEdit = null;
    },
    editProduct: function(product) {
      this.productToEdit = product;
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
.main {
  background-attachment: fixed;
  background-image: url('/static/img/challenger.png');
  background-position: center;
  background-size: cover;
  position: relative;
}
</style>
