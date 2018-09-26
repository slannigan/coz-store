<template>
  <div class="cart content-container">
    <div class='cart-inner-container'>
      <h3>Cart</h3>
      <div v-if="cart.length">
        <div class='cart-product'
          v-for="product in cart">
          <div class='left'>
            <div
              class='buttons-container'
              v-bind:class="{ 'has-edit-button': hasEditButton }">
              <button
                v-if="!product.cents"
                v-on:click="$emit('edit-product', product)">
                Edit
              </button>
              <button
                v-on:click="$emit('remove-from-cart', product)">
                x
              </button>
            </div>
            <div>
              {{ product.name }}
            </div>
          </div>
          <div>
            {{ centsToDollars(product.cents_charged) }}
          </div>
        </div>
        <div
          v-if="chargedShippingCost"
          class='cart-product'>
          <div class='left'>
            <div
              class='buttons-container'
              v-bind:class="{ 'has-edit-button': hasEditButton }">
            </div>
            <div>
              Shipping:
            </div>
          </div>
          <div>
            {{ centsToDollars(chargedShippingCost) }}
          </div>
        </div>
        <hr>
        <div class='total'>
          <h4>Total: {{ centsToDollars(totalCost) }}</h4>
        </div>
        <br>
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
        <div class='submitting-container'>
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
      </div>
      <div v-else>
        Your cart is empty.
      </div>
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
    hasEditButton: function() {
      return !!this.cart.find((item) => !item.cents );
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
          this.isSubmitting = false;
        })
        .catch((error) => {
          this.error = error;
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

<style>
.cart {
  margin: 2rem auto 0;
  max-width: calc(100% - 2rem);
  padding: 2rem 1rem;
  text-align: left;
  width: 600px;
}

.cart-inner-container {
  margin: 0 auto;
  max-width: 500px;
}

.cart-product {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
}

.cart-product:not(:last-child) {
  margin-bottom: 0.25rem;
}

.cart-product .left {
  align-items: center;
  display: flex;
}

.buttons-container {
  margin-right: 0.5rem;
  min-width: 2rem;
  text-align: right;
}

.buttons-container.has-edit-button {
  min-width: 5rem;
}

.cart-product button {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
}

.total {
  margin-top: 0.75rem;
  text-align: right;
}

.submitting-container {
  text-align: right;
}

a,
a:hover,
a:focus {
  color: #08d;
  cursor: pointer;
}
</style>
