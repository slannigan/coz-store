<template>
  <!-- https://medium.com/front-end-hacking/vues-v-model-directive-vs-sync-modifier-d1f83957c57c -->
  <div class='text-input'>
    <label>{{ label }}</label>
    <div class='input-container'>
      <input
        type="text"
        :value="val"
        @input="$emit('update:val', $event.target.value)"
        v-on:blur="setHasHadFocus"/>
      </div>
    <div
      v-if="showError"
      class='error'>
      {{ error }}
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

<style>
.text-input {
  margin-bottom: 0.3rem;
}

.input-container {
  display: inline-block;
}
</style>
