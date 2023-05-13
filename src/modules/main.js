const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const STORAGE_KEY = 'list_data';

function saveData() {
  const tasks = [];
  const listItems = listContainer.getElementsByTagName('li');
  for (let i = 0; i < listItems.length; i++) {
    const task = {
      taskName: listItems[i].textContent,
      completed: listItems[i].querySelector('input[type=checkbox]').checked
    };
    tasks.push(task);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function showList() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const tasks = JSON.parse(savedData);
    for (let i = 0; i < tasks.length; i++) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = tasks[i].completed;
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(tasks[i].taskName));
      listContainer.appendChild(li);
      const span = document.createElement('span');
      span.innerHTML = '\u00d7';
      li.appendChild(span);
    }
  }
}

showList();

const addToList = () => {
  if (inputBox.value === '') {
    alert('Please enter a task');
  } else {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(inputBox.value));
    listContainer.appendChild(li);
    const span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
};

function removeList() {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  localStorage.removeItem(STORAGE_KEY);
}

function editList(e) {
  if (e.target.tagName === 'LI') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = e.target.textContent.trim();
    e.target.replaceWith(input);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(input.value.trim()));
        input.replaceWith(li);
        saveData();
      }
    });
  }
}

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    saveData();
  } else if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
});

listContainer.addEventListener('dblclick', editList);

document.querySelector('.add-btn').addEventListener('click', addToList);
document.querySelector('.removeButton').addEventListener('click', removeList);
