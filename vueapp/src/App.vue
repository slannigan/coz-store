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
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 0.5rem;
  padding: 0;
}

body {
  background-color: #000;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
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

.main-content-container {
  margin: 2rem auto 0;
  max-width: calc(100% - 2rem);
  padding: 2rem 1rem;
  text-align: left;
  width: 600px;
}

.content-inner-container {
  margin: 0 auto;
  max-width: 500px;
}

input[type=text],
.stripe-input {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0px 2px #000;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  transition: 0.3s;
}

input[type=text].has-error,
.stripe-input.has-error {
  background-color: rgba(255, 200, 200, 0.5);
  box-shadow: 0 0px 2px #f00;
}

input[type=text] {
  font-size: 0.8rem;
  padding: 0.25rem;
}

select {
  margin-bottom: 0.25rem;
}

.error {
  background-color: #c80000;
  color: #fff;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  text-align: center;
}

button {
  background: #8f2222;
  border: 1px solid #3e060c;
  border-radius: 2px;
  box-shadow: inset 0 1px 0px #b74e4e;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: 0.3s;
}

button:hover {
  background: #a93131;
}

button:disabled {
  background: #575757;
  border: 1px solid #262626;
  box-shadow: none;
  cursor: default;
}

hr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-left: none;
  border-right: none;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  margin: 2rem auto;
  max-width: 1024px;
}

.modal-container {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  left: 0;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
}

.modal {
  background: #fff;
  border-radius: 0.25rem;
  display: inline-block;
  margin: 15% auto;
  max-width: calc(100% - 3rem);
  padding: 2rem 1rem;
  text-align: right;
  width: 500px;
}

.modal button {
  margin-top: 0.5rem;
}
</style>
