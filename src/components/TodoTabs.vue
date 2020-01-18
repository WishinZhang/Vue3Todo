<template>
  <div class="helper">
    <div class="left">{{ unDoneTodoLen }} items left</div>
    <div class="tabs">
      <div
        v-for="state in states"
        :key="state"
        :class="['tab-item', filterState === state ? 'actived' : '']"
      >
        <router-link :to="`/${state}`">{{ state }}</router-link>
      </div>
    </div>
    <div class="clear" @click="clearAllCompleted()">Clear Completed</div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  computed,
  createComponent,
  SetupContext
} from '@vue/composition-api';
import { TodoItemData } from './TodoUtils';

export interface TodoTabsProps {
  todos: Array<TodoItemData>;
  filterState: string;
}

export default createComponent({
  name: 'TodoTabs',
  props: {
    todos: {
      type: Array,
      required: true
    },
    filterState: {
      type: String,
      required: true
    }
  },
  setup(props: TodoTabsProps, context: SetupContext) {
    const states = reactive(['all', 'active', 'completed']);
    const unDoneTodoLen = computed(() => {
      return props.todos.filter(todo => !todo.completed).length;
    });
    function clearAllCompleted() {
      context.emit('clearAllCompleted');
    }
    return {
      states,
      unDoneTodoLen,
      clearAllCompleted
    };
  }
});
</script>

<style lang="less" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 14px;
}

.left,
.clear,
.tabs {
  padding: 0 10px;
  box-sizing: border-box;
}

.left,
.clear {
  width: 150px;
}

.left {
  text-align: left;
}

.clear {
  text-align: right;
  cursor: pointer;
}

.tabs {
  width: 200px;
  display: flex;
  justify-content: space-around;
  & > .tab-item {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
    & > a {
      color: #000;
      text-decoration: none;
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: #000;
      }
    }
  }
  & > .actived {
    border-color: rgba(175, 47, 47, 0.4);
    border-radius: 5px;
  }
}
</style>
