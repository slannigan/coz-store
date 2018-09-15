<template>
  <div>
    <h4>Credit Card Input (won't charge for realsies yet)</h4>
    <div id="card-element"></div>
    <div
      class="error"
      v-if="error">
      {{ error }}
    </div>
    <button
      v-on:click="submit()">Submit payment</button>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Stripe',
  props: {
    centsCharged: Number
  },
  data: function() {
    return {
      card: null,
      error: '',
      stripe: null,
      submitting: false,
      success: false
    };
  },
  methods: {
    submit: function() {
      this.submitting = true;
      this.success = false;
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          // Inform the customer that there was an error.
          this.error = result.error.message;
          this.submitting = false;
        } else {
          // Send the token to your server.
          axios
            .post(`${process.env.API_URL}/transactions`, {
              cents_charged_total: this.centsCharged,
              stripe_token: result.token
            })
            .then((response) => {
              // this.products = response.data.products;
              this.success = true;
            })
            .catch((error) => {
              this.error = error;
            })
            .finally(() => {
              this.submitting = false;
            });
        }
      });
    }
  },
  mounted() {
    this.stripe = Stripe('pk_test_SJaYyjJ2DRXChbLqHGD6YYA6');
    const elements = this.stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    const style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
      }
    };

    // Create an instance of the card Element.
    this.card = elements.create('card', { style });

    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');

    this.card.addEventListener('change', (event) => {
      this.error = event.error ? event.error.message : '';
    });
  }
}
</script>

<style>
.error {
  background-color: #f00;
  color: #fff;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
}
</style>
