<template>
  <div class='nav-wrapper'>
    <div class="nav">
      <div class='container'>
        <h3><a href='#about'>Our Story</a></h3>
        <h3><a href='#shop'>Shop</a></h3>
        <h3><a href='#cart'>Cart ({{ itemsInCart }})</a></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    itemsInCart: Number
  }
}
</script>

<style scoped>
.nav-wrapper {
  height: 4rem;
  position: relative;
}

.nav {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  position: fixed;
  width: 100%;
}

h3 {
  display: inline-block;
  font-weight: 300;
  margin: 0;
}

h3:not(:last-child) {
  margin-right: 2rem;
}

.container {
  text-align: right;
}

.nav a,
.nav a:focus,
.nav a:hover {
  color: #fff;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}
</style>
