<template>
  <div class="main">
    <Nav
      v-bind:itemsInCart='cart.length' />
    <img class='logo' src='/static/img/logo-large.png'>
    <!-- <Video /> -->
    <ProductList
      v-bind:products='products'
      v-on:set-products='setProducts'
      v-on:add-to-cart='addToCart' />
    <hr>
    <Cart
      v-bind:products='products'
      v-bind:cart='cart'
      v-on:clear-cart='clearCart'
      v-on:remove-from-cart='removeFromCart'
      v-on:edit-product='editProduct' />
    <hr>
    <About />
    <Contact />
    <Footer />

    <EditModal
      v-if='productToEdit'
      v-bind:product='productToEdit'
      v-on:done-edit='doneEdit' />
  </div>
</template>

<script>
import About from './About.vue';
import Cart from './Cart.vue';
import Contact from './Contact.vue';
import EditModal from './EditModal.vue';
import Footer from './Footer.vue';
import Nav from './Nav.vue';
import ProductList from './ProductList.vue';
import Video from './Video.vue';

export default {
  name: 'MainPage',
  components: {
    About,
    Cart,
    Contact,
    EditModal,
    Footer,
    Nav,
    ProductList,
    Video
  },
  data: function() {
    return {
      cart: [],
      isLocalStorageAvailable: false,
      products: [],
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
      // If user has added a download and DVD separately, combine into the cheaper download+DVD product
      if (product.slug === 'fl-live-mp3s' || product.slug === 'fl-live-dvd') {
        const partnerSlug = (product.slug === 'fl-live-mp3s') ? 'fl-live-dvd' : 'fl-live-mp3s';
        const partnerProduct = this.cart.find((obj) => obj.slug === partnerSlug);
        if (partnerProduct) {
          const partnerProductIndex = this.cart.indexOf(partnerProduct);
          this.cart.splice(partnerProductIndex, 1);
          const combinedProduct = this.products.find((obj) => obj.slug === 'fl-live-dvd-mp3s');
          this.addToCart(combinedProduct);
          return;
        }
      }
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
      while (this.cart.length) {
        // Manually pop all cart elements, to be sure Vue notices array changes
        this.cart.pop();
      }
      this.updateLocalStorage();
    },
    removeFromCart: function(product) {
      this.cart.splice(this.cart.indexOf(product), 1);
      this.updateLocalStorage();
    },
    setProducts: function(products) {
      this.products = products;
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

.logo {
  margin-bottom: 2rem;
  max-width: calc(100% - 4rem);
  width: 500px;
}
</style>
