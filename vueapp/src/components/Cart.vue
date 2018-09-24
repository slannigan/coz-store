<template>
  <div class="cart container content-container">
    <h2>Cart</h2>
    <div v-if="cart.length">
      <div class='cart-product'
        v-for="product in cart">
        <div>
          <a
            tabindex='0'
            v-on:click="$emit('remove-from-cart', product)">
            (x)
          </a>
          <a
            v-if="!product.cents"
            v-on:click="$emit('edit-product', product)">
            (edit)
          </a>
          {{ product.name }}
        </div>
        <div>
          {{ centsToDollars(product.cents_charged) }}
        </div>
      </div>
      <div
        v-if="chargedShippingCost"
        class='cart-product'>
        <div>
          Shipping:
        </div>
        <div>
          {{ centsToDollars(chargedShippingCost) }}
        </div>
      </div>
      <hr>
      <div class='total'>
        Total: {{ centsToDollars(totalCost) }}
      </div>
      <br>
      <h4>Submission Form</h4>
      <CartForm
        v-bind:weight="weight"
        v-bind:isSubmitting="isSubmitting"
        v-bind:shippingCost="centsToDollars(shippingCost)"
        v-on:cancel-submit="cancelSubmit"
        v-on:set-cart-form-data="setCartFormData"
        v-on:set-is-mailing="setIsMailing" />
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
      isMailing: false,
      isSubmitting: false,
      submittedSuccessfully: false,
      stripeToken: null
    }
  },
  props: {
    cart: Array
  },
  computed: {
    chargedShippingCost: function() {
      return (this.isMailing && this.shippingCost) || 0;
    },
    productsCost: function() {
      return this.cart.reduce((accumulator, currentVal) => {
        return accumulator + currentVal.cents_charged;
      }, 0);
    },
    shippingCost: function() {
      const weight = this.weight;
      if (!weight || weight > 600) {
        return;
      }
      const envelopeCost = 100;
      const shippingFor100To200Grams = Math.ceil(295 * 1.13);
      const shippingFor300To400Grams = Math.ceil(470 * 1.13);
      if (weight === 150) {
        return envelopeCost + shippingFor100To200Grams;
      } else if (weight === 300) {
        return envelopeCost + shippingFor300To400Grams;
      } else if (weight === 450) {
        return (2 * envelopeCost) + shippingFor100To200Grams + shippingFor300To400Grams;
      } else if (weight === 600) {
        return (2 * envelopeCost) + (2 * shippingFor300To400Grams);
      }
    },
    totalCost: function() {
      return this.productsCost + (this.chargedShippingCost || 0);
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
      if (cents) {
        return `$${(cents / 100).toFixed(2)}`;
      }
    },
    setCartFormData: function(data) {
      if (this.isSubmitting) {
        this.cartFormData = data;
        this.attemptSubmit();
      }
    },
    setIsMailing: function(val) {
      this.isMailing = val;
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
          cents_charged_donation: 0, // TODO: add donation
          cents_charged_shipping: this.chargedShippingCost,
          cents_charged_total: this.totalCost,
          city: this.cartFormData.city,
          email: this.cartFormData.email,
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
          this.$emit('clear-cart');
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

a,
a:hover,
a:focus {
  color: #08d;
  cursor: pointer;
}
</style>
