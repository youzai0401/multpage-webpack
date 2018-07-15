<style>
  body {
    font: Helvetica, sans-serif;
    color: #999;
  }
</style>

<template>
  <div>
    <h1>{{msg}}</h1>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld';

export default {
  data() {
    return {
      msg: 'Hello from index module!',
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
