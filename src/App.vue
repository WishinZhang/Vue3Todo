<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

export default createComponent({
  name: 'App',
  setup() {
    return {};
  }
});
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
