<template>
  <div class="cart container">
    <h2>Cart</h2>
    <div v-if="cart.length">
      <div class='cart-product'
        v-for="product in cart">
        <div>
          <a
            class='remove'
            tabindex='0'
            v-on:click="$emit('remove-from-cart', product)">
            (x)
          </a>
          {{ product.name }}
        </div>
        <div>
          {{ centsToDollars(product.cents) }}
        </div>
      </div>
      <hr>
      <div class='total'>
        Total: {{ centsToDollars(centsCharged) }}
      </div>
      <hr>
      <Stripe
        v-bind:cart="cart"
        v-bind:centsCharged="centsCharged" />
    </div>
    <div v-else>
      Your cart is empty.
    </div>
  </div>
</template>

<script>
import Stripe from './Stripe.vue';

export default {
  name: 'Cart',
  components: {
    Stripe
  },
  props: {
    cart: Array
  },
  computed: {
    centsCharged: function() {
      let sum = 0;
      for (let i = 0; i < this.cart.length; i++) {
        sum += this.cart[i].cents;
      }
      return sum;
    }
  },
  methods: {
    centsToDollars: function(cents) {
      return `$${(cents / 100).toFixed(2)}`;
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid #f00;
  margin-top: 2rem;
  max-width: calc(1024px - 2rem);
  padding: 1rem;
  text-align: left;
  width: calc(100% - 2rem);
}

.cart-product {
  display: flex;
  justify-content: space-between;
}

.total {
  text-align: right;
}

.remove {
  color: #0af;
  cursor: pointer;
}
</style>
