import { ref, computed, Ref } from '@vue/composition-api';

export interface TodoItemData {
  id: number;
  content: string;
  completed: boolean;
}

/**
 * useState
 */
export function useState() {
  const todos = ref<Array<TodoItemData>>([]);
  const filterState = ref<string>('all');
  const todoContent = ref<string>('');
  const filteredTodos = computed(() => {
    let filterTodos = todos.value;
    if (filterState.value !== 'all') {
      const completed = filterState.value === 'completed';
      filterTodos = todos.value.filter((todo: TodoItemData) => {
        return completed === todo.completed;
      });
    }
    return filterTodos;
  });
  return {
    todos,
    filterState,
    todoContent,
    filteredTodos
  };
}

let id = 0; // todo id

/**
 * 新增todo项
 * @param todos todo列表
 * @param content todo内容
 */
export function addTodo(todos: Array<TodoItemData>, content: Ref<string>) {
  if (content.value.trim()) {
    todos.unshift({
      id: id++,
      content: content.value.trim(),
      completed: false
    });
    content.value = '';
  } else {
    alert('输入不能为空 !');
  }
}

/**
 * 触发todo删除事件
 * @param props props
 * @param emit 事件
 */
export function deleteTodo(todos: Array<TodoItemData>, id: number) {
  const index = todos.findIndex(todo => todo.id === id);
  todos.splice(index, 1);
}

/**
 * 设置过滤状态
 * @param filterState 过滤状态
 * @param state 选择的状态值
 */
export function setFilterState(filterState: Ref<string>, state: string) {
  filterState.value = state;
}

/**
 * 清除所有已完成的todo项
 * @param todos todo列表
 */
export function clearAllCompleted(todos: Array<TodoItemData>) {
  todos = todos.filter(todo => todo.completed === false);
}

/**
 * 获取todo数据
 */
export function getTodoData(): Array<TodoItemData> {
  const todos: Array<TodoItemData> = JSON.parse(
    localStorage.getItem('Vue3Todo') || '[]'
  );
  id = todos.length === 0 ? 0 : Number(localStorage.getItem('todoId'));
  return todos;
}

/**
 * 保存todo数据
 * @param todos todo列表
 */
export function saveTodoData(todos: Array<TodoItemData>) {
  localStorage.setItem('todoId', `${id}`);
  localStorage.setItem('Vue3Todo', JSON.stringify(todos));
}
