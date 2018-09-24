<template>
  <div class='stripe-container'>
    <h3>Credit Card</h3>
    <div
      id="card-element"
      class="card-element stripe-input">
    </div>
    <div
      class="error"
      v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stripe',
  props: {
    isSubmitting: Boolean
  },
  data: function() {
    return {
      card: null,
      error: '',
      stripe: null
    };
  },
  methods: {
    submit: function() {
      this.error = '';
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          // Inform the customer that there was an error.
          this.error = result.error.message;
          this.$emit('cancel-submit');
        } else {
          // Send the token to your server.
          this.$emit('set-stripe-token', result.token);
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
  },
  watch: {
    isSubmitting: function(val) {
      if (val) {
        this.submit();
      }
    }
  }
}
</script>

<style>
.stripe-container {
  margin: 0 auto;
  max-width: 100%;
  width: 500px;
}

.error {
  margin: 1rem 0;
}

.success {
  color: #0f4;
}

.card-element {
  padding: 0.5rem 1rem;
}

.stripe-container h3 {
  margin: 0 0 0.5rem;
  padding: 0;
}
</style>
