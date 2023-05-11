import './index.css';

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const saveData = () => {
  localStorage.setItem('data', listContainer.innerHTML);
};

const showList = () => {
  listContainer.innerHTML = localStorage.getItem('data');
};

const removeList = () => {
  const list = document.getElementById('list-container');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

const addToList = () => {
  if (inputBox.value === '') {
    alert('Please enter a task');
  } else {
    const li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    const span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
};

addToList();

listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

const tasks = [
  {
    description: 'Clean the kitchen',
    completed: false,
    index: 1,
  },
  {
    description: 'Do laundry',
    completed: true,
    index: 2,
  },
  {
    description: 'Buy groceries',
    completed: false,
    index: 3,
  },
];

const list = document.querySelector('#list-container');

tasks.forEach((task) => {
  const listItem = document.createElement('li');
  listItem.textContent = task.description;
  if (task.completed) {
    listItem.classList.add('checked');
  } else {
    listItem.classList.add('todo');
  }
  list.appendChild(listItem);
});

saveData();
