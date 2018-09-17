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
      <br>
      <h4>Submission Form</h4>
      <CartForm
        v-bind:weight="weight"
        v-bind:isSubmitting="isSubmitting"
        v-on:cancel-submit="cancelSubmit"
        v-on:set-cart-form-data="setCartFormData" />
      <Stripe
        v-bind:isSubmitting="isSubmitting"
        v-on:cancel-submit="cancelSubmit"
        v-on:set-stripe-token="setStripeToken" />
      <br>
      <div v-if="error.length">
        <div class='error'>
          {{ error }}
        </div>
        <br>
      </div>
      <div
        v-if="isSubmitting">
        Submitting...
      </div>
      <div
        v-else-if="submittedSuccessfully" class='success'>
        Success!
      </div>
      <button
        v-else
        v-on:click="triggerSubmit()">
        Submit payment
      </button>
    </div>
    <div v-else>
      Your cart is empty.
    </div>
  </div>
</template>

<script>
import Stripe from './Stripe.vue';
import CartForm from './CartForm.vue';
const axios = require('axios');

export default {
  name: 'Cart',
  components: {
    CartForm,
    Stripe
  },
  data: function() {
    return {
      cartFormData: null,
      error: '',
      isSubmitting: false,
      submittedSuccessfully: false,
      stripeToken: null
    }
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
    },
    weight: function() {
      let sum = 0;
      for (let i = 0; i < this.cart.length; i++) {
        sum += this.cart[i].grams;
      }
      return sum;
    }
  },
  methods: {
    attemptSubmit: function() {
      if (this.isSubmitting && this.stripeToken && this.cartFormData) {
        this.submit();
      }
    },
    cancelSubmit: function(error) {
      this.isSubmitting = false;
      this.stripeToken = null;
      this.cartFormData = null;
      this.error = error || '';
    },
    centsToDollars: function(cents) {
      return `$${(cents / 100).toFixed(2)}`;
    },
    setCartFormData: function(data) {
      if (this.isSubmitting) {
        this.cartFormData = data;
        this.attemptSubmit();
      }
    },
    setStripeToken: function(token) {
      if (this.isSubmitting) {
        this.stripeToken = token;
        this.attemptSubmit();
      }
    },
    submit: function() {
      axios
        .post(`${process.env.API_URL}/transactions`, {
          address_line_1: this.cartFormData.address_line_1,
          address_line_2: this.cartFormData.address_line_2,
          cart: this.cart,
          cents_charged_total: this.centsCharged,
          city: this.cartFormData.city,
          first_name: this.cartFormData.first_name,
          last_name: this.cartFormData.last_name,
          pickup_location: this.cartFormData.pickup_location,
          postal_code: this.cartFormData.postal_code,
          province: this.cartFormData.province,
          stripe_token: this.stripeToken
        })
        .then((response) => {
          // this.products = response.data.products;
          this.submittedSuccessfully = true;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    triggerSubmit: function() {
      this.error = '';
      this.isSubmitting = true;
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
