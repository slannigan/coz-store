<template>
  <div
    class="modal-container">
    <div class="modal"
      v-on:click="sink">
      <div
        v-html="text"
        class='center'>
        {{ text }}
      </div>
      <button v-on:click="close">
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    text: String
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    sink: function(e) {
      e.stopPropagation();
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
