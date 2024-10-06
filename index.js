// Function to format date to DD/MM/YYYY
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Display items when the page loads
displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');
  let todoItem = inputElement.value;
  let todoDate = dateElement.value;

  if (!todoItem || !todoDate) {
    alert("Please fill in both the task and date.");
    return;
  }

  // Store date in DD/MM/YYYY format
  todoList.push({ item: todoItem, dueDate: formatDate(todoDate) });
  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';
  dateElement.value = '';
  displayItems();
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate } = todoList[i];
    newHtml += `
      <div>
        <span>${item}</span>
        <span>${dueDate}</span>
        <button class='btn-delete' data-index="${i}">Delete</button>
      </div>
    `;
  }
  containerElement.innerHTML = newHtml;

  // Add event listeners to delete buttons
  let deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      let index = button.getAttribute('data-index');
      todoList.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      displayItems();
    });
  });
}

// Reset button to clear the entire to-do list
function resetTodoList() {
  todoList = [];
  localStorage.removeItem('todoList'); // Clear localStorage
  displayItems();
}
