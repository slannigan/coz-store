<template>
  <div
    v-on:click="cancel"
    class="edit-modal-container">
    <div class="edit-modal"
      v-on:click="sink">
      Set amount to charge: ({{ temp_cents_charged }})
      <input v-model="temp_cents_charged">
      <button v-on:click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModal',
  props: {
    product: Object
  },
  data: function() {
    return {
      error: '',
      temp_cents_charged: ''
    };
  },
  methods: {
    cancel: function(e) {
      this.$emit('done-edit');
    },
    sink: function(e) {
      e.stopPropagation();
    },
    submit: function() {
      const cents_charged = parseFloat(this.temp_cents_charged) * 100;
      this.$emit('done-edit', cents_charged);
    }
  },
  mounted() {
    if (this.product.cents_charged) {
      this.temp_cents_charged = (this.product.cents_charged / 100).toFixed(2);
    }
  }
};
</script>

<style>
.edit-modal-container {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
}

.edit-modal {
  background: #fff;
  border-radius: 1rem;
  display: inline-block;
  left: calc(50% - 20rem);
  padding: 1rem;
  position: fixed;
  right: calc(50% - 20rem);
  top: 15%;
}
</style>
