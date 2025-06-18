  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');
  const filterStatus = document.getElementById('filter');
  const themeToggle = document.querySelector('.theme-toggle');
  const empty = document.querySelector('.empty');
  const emptyImg = document.querySelector('.empty__img');
  const todoList = document.querySelector('.todo-list');
  const addBtn = document.querySelector('.add-btn');
  const modal = document.getElementById('modal');
  const noteInput = document.getElementById('noteInput');
  const applyBtn = document.getElementById('applyBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  let todos = [];
  let activeFilterStatus = filterStatus.value;
  let activeSearchInput = '';

  function generateId() {
    return Math.random().toString(36).slice(0, 8);
  }

  function createToDo() {
    const taskLabel = noteInput.value.trim();

    if (taskLabel !== '') {
      const isTaskComleted = false;
      const taskId = generateId();

      todos.push({taskId, taskLabel, isTaskComleted});
      
      modal.classList.add('hidden');
      
      renderTodos();
    }
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

      renderTodos();
    });

    const label = document.createElement('span');
    label.classList.add('todo-item__title');
    label.textContent = activeTodo.taskLabel;

    if (activeTodo.isTaskComleted) {
      li.classList.add('todo-item__completed');
    }
    
    
    li.appendChild(checkbox);
    li.appendChild(label);

    const control = document.createElement('div');
    control.className = 'todo-item__control';

    const edit = document.createElement('button');
    edit.classList.add('todo-item__control-btn');
    edit.classList.add('todo-item__control-btn-edit');

    edit.addEventListener('click', () => {
      const input = document.createElement('input');

      input.type = 'text';
      input.value = activeTodo.taskLabel;
      input.className = 'todo-item__input';
      li.replaceChild(input, label);
      input.focus();

      const changeLabel = () => {
        const newLabel = input.value.trim();

        if (newLabel !== '') {
          activeTodo.taskLabel = newLabel;
        }

        renderTodos();
      };

      input.addEventListener('keydown', (btn) => {
        if (btn.key === 'Enter') {
          changeLabel();
        }

        if (btn.key === 'Escape') {
          li.replaceChild(label, input);
        }
      });

      input.addEventListener('blur', () => {
        li.replaceChild(label, input);
      });
    });

    const deleteBtn = document.createElement('button');    
    deleteBtn.classList.add('todo-item__control-btn');
    deleteBtn.classList.add('todo-item__control-btn-delete');

    deleteBtn.addEventListener('click', () => {
      todoList.removeChild(li);
      todos = todos.filter(todo => todo.taskId !== activeTodo.taskId);
      renderTodos();
    });

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
        if (!activeSearchInput || todo.taskLabel.includes(activeSearchInput)) {
          showTodo(todo);
        }
      }
    });

    empty.classList.toggle('hidden', todoList.children.length > 0);
  }

  searchInput.addEventListener('keydown', (btn) => {
    if (btn.key === 'Enter') {
      searchInput.value = searchInput.value.trim();
      activeSearchInput = searchInput.value;
      searchInput.blur();

      renderTodos();
    }

    if (btn.key === 'Escape') {
      searchInput.blur();
    }
  });

  searchInput.addEventListener('blur', () => {
    searchInput.value = activeSearchInput;
  });

  searchBtn.addEventListener('click', () => {
    searchInput.value = searchInput.value.trim();
    activeSearchInput = searchInput.value;

    renderTodos();
  });

  filterStatus.addEventListener('change', () => {
    activeFilterStatus = filterStatus.value;
    renderTodos();
  });

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.toggleAttribute('data-dark');
    themeToggle.classList.toggle('theme-toggle-dark', isDark);
    emptyImg.classList.toggle('empty__img-dark', isDark);
  });

  addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    noteInput.value = '';
    noteInput.focus();
  });

  noteInput.addEventListener('keydown', (btn) => {
    if (btn.key === 'Enter') {
      createToDo();
    }

    if (btn.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  applyBtn.addEventListener('click', () => {
    createToDo();
  });
