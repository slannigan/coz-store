<template>
  <div
    v-on:click="cancel"
    class="modal-container">
    <div class="modal"
      v-on:click="sink">
      <TextInput
        label="Enter promo code:"
        v-bind:val.sync="promoCodeText"
        v-bind:error="error"
        v-bind:forceShowError="hasSubmitted" />
      <div
        v-if="apiError"
        class='error'>
        {{ apiError }}
      </div>
      <button disabled
        v-if="isCallingAPI">
        Loading...
      </button>
      <button
        v-else
        v-on:click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
const axios = require('axios');

export default {
  name: 'PromoCodeModal',
  components: {
    TextInput
  },
  props: {
    promoCode: Object
  },
  data: function() {
    return {
      apiError: '',
      hasSubmitted: false,
      isCallingAPI: false,
      promoCodeText: ''
    };
  },
  computed: {
    error: function() {
      if (!this.promoCodeText) {
        return 'Must enter a promo code.';
      }
    }
  },
  methods: {
    cancel: function(e) {
      if (!this.isCallingAPI) {
        this.$emit('cancel-edit');
      }
    },
    sink: function(e) {
      e.stopPropagation();
    },
    submit: function() {
      this.hasSubmitted = true;
      if (!this.error) {
        if (this.isCallingAPI) {
          return;
        }
        this.apiError = null;
        this.isCallingAPI = true;
        axios
          .get(`${process.env.API_URL}/promo_codes/${this.promoCodeText}`)
          .then((response) => {
            if (response.data) {
              this.$emit('set-promo-code', response.data);
              this.$emit('cancel-edit');
            } else {
              this.apiError = 'That promo code does not exist.';
            }
            this.isCallingAPI = false;
          })
          .catch((error) => {
            this.apiError = 'An unknown error occurred. Please try again later.';
            this.isCallingAPI = false;
          });
      }
    }
  }
};
</script>
