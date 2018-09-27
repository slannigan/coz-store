<template>
  <div
    v-on:click="cancel"
    class="modal-container">
    <div class="modal"
      v-on:click="sink">
      <TextInput
        label="Set amount to donate:"
        v-bind:val.sync="tempCentsCharged"
        v-bind:error="error"
        v-bind:forceShowError="hasSubmitted" />
      <button v-on:click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
export default {
  name: 'EditModal',
  components: {
    TextInput
  },
  props: {
    product: Object
  },
  data: function() {
    return {
      hasSubmitted: false,
      tempCentsCharged: ''
    };
  },
  computed: {
    error: function() {
      const val = this.tempCentsCharged;
      if (!val || !val.match(/^\s*\$?\d+(\.\d{0,2})?\s*$/)) {
        return 'Must be a valid dollar amount.';
      }
    }
  },
  methods: {
    cancel: function(e) {
      this.$emit('done-edit');
    },
    sink: function(e) {
      e.stopPropagation();
    },
    submit: function() {
      this.hasSubmitted = true;
      if (!this.error) {
        const input = this.tempCentsCharged.trim();
        const dollars = input.indexOf('$') === 0 ? input.slice(1) : input;
        const cents = parseFloat(dollars) * 100;
        this.$emit('done-edit', cents);
      }
    }
  },
  mounted() {
    if (this.product.cents_charged) {
      this.tempCentsCharged = (this.product.cents_charged / 100).toFixed(2);
    }
  }
};
</script>
