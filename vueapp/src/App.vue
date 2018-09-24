<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}

.container {
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
}

input[type=text],
.stripe-input,
.content-container {
  border-radius: 2px;
}

.content-container {
  background-color: rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 0px 50px rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.8);
}

input[type=text],
.stripe-input {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0px 2px #000;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  transition: 0.3s;
}

input[type=text] {
  font-size: 0.8rem;
  padding: 0.25rem;
}

.error {
  background-color: #eb1111;
  color: #fff;
  padding: 0.5rem 1rem;
}

button {
  background: #8f2222;
  border: 1px solid #6e0b0b;
  border-radius: 2px;
  box-shadow: inset 0 1px 0px #b74e4e;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #a93131;
}

hr {
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
