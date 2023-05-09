const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

addToList = () => {
    if(inputBox.value === ''){
        
    } else {
        let li = document.createElement('li'); // in the line it is making one HTML element with the tag name 'li'
        li.innerHTML = inputBox.value; //making as whenever someone text in the input it appears there
        listContainer.appendChild(li); // where the content of the input should displayed
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked'); //making the line through the middle when you the user clicks on the to-do list
        saveData();
    } else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
}, false)
// localStorage

saveData = () => {
    localStorage.setItem('data',listContainer.innerHTML);
}

showList = () => {
  listContainer.innerHTML = localStorage.getItem('data')
}
showList();

removeList = () => {
  // Select the to-do list element
  const list = document.getElementById('list-container');
  // Remove all the child elements of the to-do list element
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}