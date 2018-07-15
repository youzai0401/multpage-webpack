<style>
  body {
    font: Helvetica, sans-serif;
    color: #999;
  }
</style>

<template>
  <div>
    <h1>{{msg}}</h1>
    <a href="test.html">test</a>
    <a href="home.html">home</a>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'Hello from index module!',
    };
  },
};
</script>
