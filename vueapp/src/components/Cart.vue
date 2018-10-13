<template>
  <div class="cart content-container main-content-container">
    <div class='content-inner-container'>
      <h3 id='cart'>Cart</h3>
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
          v-if="promoCode"
          class='cart-product'>
          <div class='left'>
            <div
              class='buttons-container'
              v-bind:class="{ 'has-edit-button': hasEditButton }">
              <button
                v-on:click="editPromoCode">
                Edit
              </button>
              <button
                v-on:click="setPromoCode">
                x
              </button>
            </div>
            <div>
              {{ promoCode.code.toUpperCase() }}: {{ promoCode.percent_off }}% off {{ promoCode.product_slug ? (promoCodeProduct && promoCodeProduct.name || promoCode.product_slug) : '' }}
            </div>
          </div>
          <div>
            -{{ centsToDollars(promoCodeCentsOff) || '$0.00' }}
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
          <button
            v-on:click="editPromoCode">
            {{ promoCodeBtnText }}
          </button>
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
          <button disabled
            v-if="isSubmitting">
            Submitting...
          </button>
          <button
            v-else
            v-on:click="triggerSubmit()">
            Submit payment ({{ centsToDollars(totalCost) }})
          </button>
        </div>
      </div>
      <div v-else>
        Your cart is empty.
      </div>
    </div>
    <AlertModal
      v-if="successAlertMessage"
      v-bind:text="successAlertMessage"
      v-on:close="closeSuccessMessage" />
    <PromoCodeModal
      v-if="isEditingPromoCode"
      v-bind:promoCode="promoCode"
      v-on:cancel-edit="cancelEditPromoCode"
      v-on:set-promo-code="setPromoCode" />
  </div>
</template>

<script>
import AlertModal from './AlertModal.vue';
import CartForm from './CartForm.vue';
import PromoCodeModal from './PromoCodeModal.vue';
import Stripe from './Stripe.vue';
const axios = require('axios');

export default {
  name: 'Cart',
  components: {
    AlertModal,
    CartForm,
    PromoCodeModal,
    Stripe
  },
  data: function() {
    return {
      cartFormData: null,
      error: '',
      isEditingPromoCode: false,
      isLocalStorageAvailable: false,
      isMailing: false,
      isSendingToAPI: false,
      isSubmitting: false,
      promoCode: null,
      successEmail: '',
      stripeToken: null
    }
  },
  props: {
    cart: Array,
    products: Array
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
    promoCodeBtnText: function() {
      if (this.promoCode) {
        return 'Change promo code';
      }
      return 'Apply promo code';
    },
    promoCodeCentsOff: function() {
      if (this.promoCode) {
        const percentOff = this.promoCode.percent_off / 100;
        if (this.promoCode.product_slug) {
          if (this.promoCodeProduct) {
            return Math.floor(this.promoCodeProduct.cents_charged * percentOff);
          }
          return 0;
        }
        return Math.floor(this.productsCost * percentOff);
      }
    },
    promoCodeProduct: function() {
      if (this.promoCode && this.promoCode.product_slug) {
        return this.products.find((obj) => obj.slug === this.promoCode.product_slug);
      }
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
    successAlertMessage: function() {
      if (this.successEmail) {
        return `Your payment has been received! A receipt has been sent to ${this.successEmail}.`;
      }
    },
    totalCost: function() {
      return this.productsCost - (this.promoCodeCentsOff || 0) + (this.chargedShippingCost || 0);
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
      if (!this.isSendingToAPI &&
          this.isSubmitting &&
          this.stripeToken &&
          this.cartFormData) {
        this.submit();
      }
    },
    cancelEditPromoCode: function() {
      this.isEditingPromoCode = false;
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
    closeSuccessMessage: function() {
      this.successEmail = null;
    },
    editPromoCode: function() {
      this.isEditingPromoCode = true;
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
    setPromoCode: function(promoCode) {
      if (promoCode && promoCode.code) {
        this.promoCode = promoCode;
      } else {
        this.promoCode = null;
      }
      this.updateLocalStorage();
    },
    setStripeToken: function(token) {
      if (this.isSubmitting) {
        this.stripeToken = token;
        this.attemptSubmit();
      }
    },
    submit: function() {
      if (this.isSendingToAPI) {
        return;
      }
      this.isSendingToAPI = true;
      axios
        .post(`${process.env.API_URL}/transactions`, {
          address_line_1: this.cartFormData.address_line_1,
          address_line_2: this.cartFormData.address_line_2,
          cart: this.cart,
          cents_charged_shipping: this.chargedShippingCost,
          cents_charged_total: this.totalCost,
          city: this.cartFormData.city,
          email: this.cartFormData.email,
          first_name: this.cartFormData.first_name,
          last_name: this.cartFormData.last_name,
          pickup_location: this.cartFormData.pickup_location,
          postal_code: this.cartFormData.postal_code,
          promo_code: this.promoCodeCentsOff ? this.promoCode.code : null,
          province: this.cartFormData.province,
          stripe_token_id: this.stripeToken.id
        })
        .then((response) => {
          // this.products = response.data.products;
          this.successEmail = this.cartFormData.email;
          this.$emit('clear-cart');
          this.setPromoCode();
          this.isMailing = false;
          this.isSubmitting = false;
          this.isSendingToAPI = false;
        })
        .catch((error) => {
          this.error = error.response.data || error.response.statusText;
          this.isSubmitting = false;
          this.isSendingToAPI = false;
        });
    },
    triggerSubmit: function() {
      this.error = '';
      const donation = this.cart.find((item) => item.slug === 'donation');
      if (donation && donation.cents_charged > 10000) {
        const confirmDonation = confirm(`$${(donation.cents_charged / 100).toFixed(2)} is a generous donation! Click OK to confirm.`);
        if (!confirmDonation) {
          return;
        }
      }
      this.isSubmitting = true;
    },
    updateLocalStorage: function() {
      if (this.isLocalStorageAvailable) {
        localStorage.setItem('promoCode', JSON.stringify(this.promoCode));
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

    const promoCode = localStorage.getItem('promoCode');
    if (promoCode) {
      this.promoCode = JSON.parse(promoCode);
    }
  }
}
</script>

<style>
.cart-product {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
}

.cart-product:not(:last-child) {
  margin-bottom: 0.25rem;
}

.cart-product .left {
  align-items: baseline;
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

.cart hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
