<template>
  <!-- https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c -->
  <div class='text-input'>
    <div>
      <label>{{ label }}</label>
      <div class='input-container'>
        <input
          type="text"
          :value="val"
          @input="$emit('update:val', $event.target.value)"
          v-on:blur="setHasHadFocus"
          v-bind:class="{ 'has-error': showError }" />
      </div>
    </div>
    <div
      v-if="showError"
      class='error-container'>
      <div class='error'>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    error: String,
    forceShowError: Boolean,
    label: String,
    val: String
  },
  data: function() {
    return {
      hasHadFocus: false
    }
  },
  computed: {
    showError: function() {
      return this.error && (this.forceShowError || this.hasHadFocus);
    }
  },
  methods: {
    setHasHadFocus: function(e) {
      this.hasHadFocus = true;
    }
  }
}
</script>

<style scoped>
.text-input {
  margin-bottom: 0.3rem;
}

.text-input > div:first-child {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.input-container {
  display: inline-block;
}

.error-container {
  text-align: right;
}

.error {
  display: inline-block;
  margin-top: 0.25rem;
}
</style>
