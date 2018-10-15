<template>
  <div class='product content-container'>
    <div>
      <h3>{{ product.name }}</h3>
      <div>{{ product.description }}</div>
    </div>
    <div>
      <div>
        <img v-bind:src="imgSrc" />
      </div>
      <div class='cost-container'>
        <h4 v-if="product.cents">
          <span v-if="strikethroughPrice"><span class='strikethrough-price'>{{ strikethroughPrice }}</span><br></span>
          {{ cost }}
        </h4>
      </div>
      <div class='added' v-if="justClicked">
        Added!
      </div>
      <button
        v-else
        v-on:click="addToCart">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data: function() {
    return {
      justClicked: false
    }
  },
  props: {
    product: Object,
    products: Array
  },
  computed: {
    cost: function() {
      return `$${(this.product.cents / 100).toFixed(2)}`;
    },
    imgSrc: function() {
      const cd = require('../assets/img/fl-live-cd.png');
      const cdAndDvd = require('../assets/img/fl-live-cd-dvd.png');
      const donation = require('../assets/img/donation.png');
      const dvd = require('../assets/img/fl-live-dvd.png');
      const mp3s = require('../assets/img/fl-live-mp3s.png');
      switch(this.product.slug) {
        case 'fl-live-mp3s':
          return mp3s;
        case 'fl-live-cd':
          return cd;
        case 'fl-live-dvd':
          return dvd;
        case 'fl-live-cd-dvd':
          return cdAndDvd;
        case 'donation':
          return donation;
      }
      return cd;
    },
    strikethroughPrice: function() {
      if (this.product.slug === 'fl-live-cd-dvd') {
        const cd = this.products.find((obj) => obj.slug === 'fl-live-cd');
        const dvd = this.products.find((obj) => obj.slug === 'fl-live-dvd');
        if (cd && dvd) {
          return `$${((cd.cents + dvd.cents) / 100).toFixed(2)}`;
        }
      }
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart');
      if (this.product.slug !== 'donation') {
        this.justClicked = true;
        setTimeout(() => {
          this.justClicked = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0.5rem 1rem;
  max-width: 100%;
  padding: 1.5rem 0.5rem;
  text-align: center;
  transition: 0.3s;
  width: 300px;
}

img {
  height: 8rem;
  margin: 1rem auto;
  max-width: 100%;
}

.cost-container {
  min-height: 1.5rem;
}

.strikethrough-price {
  color: #666;
  font-weight: 400;
  text-decoration: line-through;
}

.added {
  background-color: #4a9b1d;
  color: #fff;
  display: inline-block;
  padding: calc(0.5rem + 1px) 1rem;
}
</style>
