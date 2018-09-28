<template>
  <div class='stripe-container'>
    <h3>Credit Card</h3>
    <div
      id="card-element"
      class="card-element stripe-input"
      v-bind:class="{ 'has-error': error }">
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
          this.error = result.error.message;
          this.$emit('cancel-submit');
        } else {
          this.$emit('set-stripe-token', result.token);
        }
      });
    }
  },
  mounted() {
    this.stripe = Stripe(process.env.STRIPE_KEY);
    const elements = this.stripe.elements();

    const style = {
      base: {
        fontSize: '16px',
        color: "#32325d",
      }
    };

    this.card = elements.create('card', { style });
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
  margin-top: 0.25rem;
}

.card-element {
  padding: 0.5rem 1rem;
}

.stripe-container h3 {
  margin: 0 0 0.5rem;
  padding: 0;
}
</style>
