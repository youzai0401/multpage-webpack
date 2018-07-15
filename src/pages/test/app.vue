<style>
  body {
    font: Helvetica, sans-serif;
    color: #999;
  }
</style>

<template>
  <div>
    <h1>{{msg}}</h1>
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
