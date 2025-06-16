  const modal = document.getElementById('modal');
  const addBtn = document.querySelector('.add-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const noteInput = document.getElementById('noteInput');
  const applyBtn = document.getElementById('applyBtn');
  const todoList = document.querySelector('.todo-list');

  addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    noteInput.value = '';
    noteInput.focus();
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  applyBtn.addEventListener('click', () => {
    const task = noteInput.value.trim();
    if (task !== '') {

      if(todoList.children.length > 0) {
        const hr = document.createElement('hr');
        
        todoList.appendChild(hr);
      }
      
      const li = document.createElement('li');
      li.className = 'todo-item';

      const left = document.createElement('div');
      left.className = 'todo-item__left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.classList.toggle('todo-item__completed', checkbox.checked);
      });

      const label = document.createElement('span');
      label.textContent = task;
      
      left.appendChild(checkbox);
      left.appendChild(label);
      
      li.appendChild(left);

      const right = document.createElement('div');
      right.className = 'todo-item__right';

      const edit = document.createElement('button');
      edit.textContent = 'E';
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'D';

      right.appendChild(edit);
      right.appendChild(deleteBtn);

      li.appendChild(right);

      todoList.appendChild(li);

      modal.classList.add('hidden');
    }
  });
