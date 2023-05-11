const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const addToList = () => {
  if (inputBox.value === '') {
    return('');
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
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
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
// saveData();
document.querySelector('.add-btn').addEventListener('click', addToList);
document.querySelector('.removeButton').addEventListener('click', removeList);