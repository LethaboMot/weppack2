const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const STORAGE_KEY = 'list_data';

// localStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listContainer.innerHTML));
}

function showList() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    listContainer.innerHTML = JSON.parse(savedData);
  }
}
showList();

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
  saveData();
};

function removeList() {
  // Select the to-do list element
  const list = document.getElementById('list-container');
  // Remove all the child elements of the to-do list element
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  saveData();
}

function editList(e) {
  if (e.target.tagName === 'LI') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = e.target.textContent;
    e.target.replaceWith(input);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const li = document.createElement('li');
        li.textContent = e.target.value;
        input.replaceWith(li);
        saveData();
      }
    });
  }
}

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
});

function activateEdit() {
  const li = document.querySelector('li');
  li.addEventListener('dblclick', editList);
}
listContainer.addEventListener('dblclick', editList);

document.querySelector('.add-btn').addEventListener('click', addToList);
document.querySelector('.removeButton').addEventListener('click', removeList);
// double click the items on the list to edit
document.querySelector('li').addEventListener('click', activateEdit);
