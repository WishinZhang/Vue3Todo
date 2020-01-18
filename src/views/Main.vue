<template>
  <div class="app-wrap">
    <div class="app-bg"></div>
    <header class="main-header">{{ appName }}</header>
    <Todo></Todo>
    <div class="footer">
      <span>Power by {{ authorName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, createComponent } from '@vue/composition-api';
import Todo from '@components/Todo.vue';

export default createComponent({
  name: 'Main',
  components: { Todo },
  setup() {
    const appName = ref('Vue3Todo');
    const authorName = ref('WishinZhang');
    return {
      appName,
      authorName
    };
  }
});
</script>

<style lang="less" scoped>
.app-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/images/otis-redding.png) repeat;
  background-color: #d1d9e0;
  z-index: -1;
}
.main-header {
  margin: 20px;
  text-align: center;
  font-size: 70px;
  font-weight: 700;
  color: #666;
}

.footer {
  margin: 40px;
  text-align: center;
  color: #666;
  font-size: 15px;
}
</style>
