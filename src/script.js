  const modal = document.getElementById('modal');
  const addBtn = document.querySelector('.add-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const noteInput = document.getElementById('noteInput');

  addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    noteInput.value = '';
    noteInput.focus();
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });


