import './index.css';

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const addToList = () => {
  if (inputBox.value === '') {
    alert('');
  } else {
    const li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    const span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  // saveData();
};
addToList();
function removeList() {
  // Select the to-do list element
  const list = document.getElementById('list-container');
  // Remove all the child elements of the to-do list element
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}
listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();  
  }
}, false);

// localStorage
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}
function showList() {
  listContainer.innerHTML = localStorage.getItem('data');
}
showList();
// Create an array of to-do tasks
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
// Select the HTML list element
const list = document.querySelector('#list-container');
// Loop through the tasks array and create an HTML list item element for each task
tasks.forEach((task) => {
  // Create a new list item element
  const listItem = document.createElement('li');
  // Set the text content of the list item to the task description
  listItem.textContent = task.description;
  // Check if the task is completed and add a class to the list item based on the result
  if (task.completed) {
    listItem.classList.add('checked');
  } else {
    listItem.classList.add('todo');
  }
  // Add the list item to the HTML list element
  list.appendChild(listItem);
});
saveData();
document.querySelector('.add-btn').addEventListener('click', addToList);
document.querySelector('.removeButton').addEventListener('click', removeList);