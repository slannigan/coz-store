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
        <h4 v-if="product.cents">{{ cost }}</h4>
      </div>
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
</style>
