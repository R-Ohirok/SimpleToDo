  const addBtn = document.querySelector('.add-btn');
  const modal = document.getElementById('modal');
  const noteInput = document.getElementById('noteInput');
  const applyBtn = document.getElementById('applyBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const todoList = document.querySelector('.todo-list');
  const filterStatus = document.getElementById('filter');

  let todos = [];
  let activeFilterStatus = filterStatus.value;

  function generateId() {
    return Math.random().toString(36).slice(0, 8);
  }

  function showTodo(activeTodo) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = activeTodo.isTaskComleted;
    checkbox.name = activeTodo.taskId;
    checkbox.className = 'todo-item__status';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('todo-item__completed', checkbox.checked);
      activeTodo.isTaskComleted = !activeTodo.isTaskComleted;
    });

    const label = document.createElement('span');
    label.className = 'todo-item__title';

    label.textContent = activeTodo.taskLabel;
    
    li.appendChild(checkbox);
    li.appendChild(label);

    const control = document.createElement('div');
    control.className = 'todo-item__control';

    const edit = document.createElement('button');
    edit.textContent = 'E';
    edit.className = 'todo-item__control-btn';

    const deleteBtn = document.createElement('button');
    
    deleteBtn.textContent = 'D';
    deleteBtn.addEventListener('click', () => {
      todoList.removeChild(li);
      todos = todos.filter(todo => todo.taskId !== activeTodo.taskId);
      renderTodos();
    });
    deleteBtn.className = 'todo-item__control-btn';

    control.appendChild(edit);
    control.appendChild(deleteBtn);

    li.appendChild(control);

    todoList.appendChild(li);
  }

  function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
      if (
        (activeFilterStatus === 'All') || 
        (activeFilterStatus === 'Active' && !todo.isTaskComleted) || 
        (activeFilterStatus === 'Completed' && todo.isTaskComleted)
      ) {
        showTodo(todo);
      }
    });
  }

  filterStatus.addEventListener('change', () => {
    activeFilterStatus = filterStatus.value;
    renderTodos();
  });

  addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    noteInput.value = '';
    noteInput.focus();
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  applyBtn.addEventListener('click', () => {
    const taskLabel = noteInput.value.trim();

    if (taskLabel !== '') {
      const isTaskComleted = false;
      const taskId = generateId();

      todos.push({taskId, taskLabel, isTaskComleted});
      
      modal.classList.add('hidden');
      
      renderTodos();
    }
  });
