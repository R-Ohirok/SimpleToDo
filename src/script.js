  class ToDoApp {
    activeSearchInput = '';
    activePage = 1;
    perPage = 5;
    todos = [];
    toDosToShow = [];

  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.querySelector('.search-btn');
    this.filterStatus = document.getElementById('filter');
    this.themeToggle = document.querySelector('.theme-toggle');
    this.empty = document.querySelector('.empty');
    this.emptyImg = document.querySelector('.empty__img');
    this.todoList = document.querySelector('.todo-list');
    this.addBtn = document.querySelector('.add-btn');
    this.modal = document.getElementById('modal');
    this.noteInput = document.getElementById('noteInput');
    this.applyBtn = document.getElementById('applyBtn');
    this.cancelBtn = document.getElementById('cancelBtn');
    this.pagination = document.querySelector('.pagination');

    this.activeFilterStatus = this.filterStatus.value;

    this.bindEvents();
  }

  bindEvents() {
    this.searchInput.addEventListener('keydown', (btn) => {
      if (btn.key === 'Enter') {
        this.activeSearchInput = this.searchInput.value.trim();
        this.searchInput.blur();

        this.activePage = 1;
        
        this.rerenderPage();
      } else if (btn.key === 'Escape') {
        this.searchInput.value = this.activeSearchInput;
        this.searchInput.blur();
      }
    });

    this.searchInput.addEventListener('blur', () => {
      this.searchInput.value = this.searchInput.value.trim();
      this.activeSearchInput = this.searchInput.value;

      this.activePage = 1;
      
      this.rerenderPage();
    });

    this.searchBtn.addEventListener('click', () => {
      this.searchInput.value = this.searchInput.value.trim();
      this.activeSearchInput = this.searchInput.value;

      this.activePage = 1;
      
      this.rerenderPage();
    });

    this.filterStatus.addEventListener('change', () => {
      this.activeFilterStatus = this.filterStatus.value;

      this.activePage = 1;
      
      this.rerenderPage();
    });

    this.themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.toggleAttribute('data-dark');
      this.themeToggle.classList.toggle('theme-toggle-dark', isDark);
      this.emptyImg.classList.toggle('empty__img-dark', isDark);
    });

    this.addBtn.addEventListener('click', () => {
      this.modal.classList.remove('hidden');
      this.noteInput.value = '';
      this.noteInput.focus();
    });

    this.noteInput.addEventListener('keydown', (btn) => {
      if (btn.key === 'Enter') {
        this.createToDo();
      } else if (btn.key === 'Escape') {
        this.modal.classList.add('hidden');
      }
    });

    this.cancelBtn.addEventListener('click', () => {
      this.modal.classList.add('hidden');
    });

    this.applyBtn.addEventListener('click', () => {
      this.createToDo();
    });
  }

  generateId() {
    return Math.random().toString(36).slice(2, 10);
  }

  createToDo() {
    const taskLabel = this.noteInput.value.trim();

    if (taskLabel !== '') {
      this.todos.push({
        taskId: this.generateId(),
        taskLabel,
        isTaskComleted: false
      });
      
      this.modal.classList.add('hidden');
      this.rerenderPage();
    }
  }

  showTodo(activeTodo) {
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
      
      this.rerenderPage();
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

    const editBtn = document.createElement('button');
    editBtn.className = 'todo-item__control-btn todo-item__control-btn-edit';
    
    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');

      input.type = 'text';
      input.value = activeTodo.taskLabel;
      input.name = activeTodo.taskId;
      input.className = 'todo-item__input';
      li.replaceChild(input, label);
      input.focus();

      const changeLabel = () => {
        const newLabel = input.value.trim();

        if (newLabel) {
          activeTodo.taskLabel = newLabel;
        }

        this.rerenderPage();
      };

      input.addEventListener('keydown', (btn) => {
        if (btn.key === 'Enter') {
          changeLabel();
        }
      });

      input.addEventListener('blur', () => li.replaceChild(label, input));
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__control-btn todo-item__control-btn-delete';
    
    deleteBtn.addEventListener('click', () => {
      this.todos = this.todos.filter(todo => todo.taskId !== activeTodo.taskId);
      
      this.rerenderPage();
    });

    control.appendChild(editBtn);
    control.appendChild(deleteBtn);

    li.appendChild(control);

    this.todoList.appendChild(li);
  }

  renderTodos() {
    this.todoList.innerHTML = '';

    this.toDosToShow = this.todos.filter(todo => {
      if (
        (this.activeFilterStatus === 'All') || 
        (this.activeFilterStatus === 'Active' && !todo.isTaskComleted) || 
        (this.activeFilterStatus === 'Completed' && todo.isTaskComleted)
      ) {
        if (!this.activeSearchInput || todo.taskLabel.includes(this.activeSearchInput)) {
          return true;
        }
      }

      return false;
    });

    if (this.activePage !== 1 && (this.activePage - 1) * this.perPage >= this.toDosToShow.length) {
      this.activePage--;
    }

    const start = (this.activePage - 1) * this.perPage;
    const end = start + this.perPage;

    this.toDosToShow.slice(start, end)
      .forEach(todo => this.showTodo(todo));

    this.empty.classList.toggle('hidden', this.toDosToShow.length > 0);
  }

  renderPaginationBtns() {
    this.pagination.innerHTML = '';

    const pagesCount = Math.ceil(this.toDosToShow.length / this.perPage);

    for (let i = 1; i <= pagesCount; i++) {
      const paginationBtn = document.createElement('button');

      paginationBtn.textContent = i;
      
      paginationBtn.className = 'pagination__btn';
      if (i === this.activePage) {
        paginationBtn.classList.add('pagination__btn-active');
      }

      paginationBtn.addEventListener('click', () => {
        this.activePage = i;
        this.rerenderPage();
      });

      this.pagination.appendChild(paginationBtn);
    }
  }

  rerenderPage() {
    this.renderTodos();
    this.renderPaginationBtns();
  }
}

window.addEventListener('DOMContentLoaded', () => new ToDoApp());
