<template>
  <div class="real-app">
    <input
      v-model="todoContent"
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="What needs to be done?"
      @keyup.enter="handleAddTodo"
    />
    <TodoItem
      v-for="todo in filteredTodos"
      :todo="todo"
      :key="todo.id"
      @delete="handleDeleteTodo"
    />
    <TodoTabs
      :todos="todos"
      :filterState="filterState"
      @toggle="changeFilterState"
      @clearAllCompleted="handleClearAllCompleted"
    />
  </div>
</template>

<script lang="ts">
import { watch, createComponent, SetupContext } from '@vue/composition-api';
import {
  useState,
  addTodo,
  deleteTodo,
  setFilterState,
  clearAllCompleted,
  getTodoData,
  saveTodoData,
  TodoItemData
} from './TodoUtils';
import TodoItem from './TodoItem.vue';
import TodoTabs from './TodoTabs.vue';

export default createComponent({
  name: 'Todo',
  components: { TodoItem, TodoTabs },
  setup(props: any, context: SetupContext) {
    const { todos, filterState, todoContent, filteredTodos } = useState();
    todos.value = getTodoData();
    watch(() => {
      saveTodoData(todos.value);
    });
    watch(() => {
      filterState.value = (context.root as any).$route.params.state;
    });
    const handleAddTodo = () => {
      addTodo(todos.value, todoContent);
    };
    const handleDeleteTodo = (id: number) => {
      deleteTodo(todos.value, id);
    };
    const changeFilterState = (state: string) => {
      setFilterState(filterState, state);
    };
    const handleClearAllCompleted = () => {
      clearAllCompleted(todos.value);
    };
    return {
      todos,
      filterState,
      todoContent,
      filteredTodos,
      handleAddTodo,
      handleDeleteTodo,
      changeFilterState,
      handleClearAllCompleted
    };
  }
});
</script>

<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 30px 0 #c7c7c7;
  border-radius: 5px;
  overflow: hidden;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

// 解决input placeholder样式

// Webkit browsers
/deep/ input::-webkit-input-placeholder {
  color: #ccc;
}

// Mozilla Firefox 19+
/deep/ input::-moz-placeholder {
  color: #ccc;
}

// Internet Explorer 10+
/deep/ input:-ms-input-placeholder {
  color: #ccc;
}
</style>
