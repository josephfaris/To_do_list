let task = document.querySelector(".task");
let btn = document.querySelector("button");
let btn2;

// Check if there are tasks stored in localStorage and load them
if (localStorage.added == null) {
  btn2 = [];
} else {
  btn2 = JSON.parse(localStorage.added);
  // Loop through the loaded tasks and display them on the page
  btn2.forEach((taskText) => {
    displayTask(taskText);
  });
}

let addTask = () => {
  btn2.push(task.value);
  // Create and display a new task
  displayTask(task.value);
  window.localStorage.setItem("added", JSON.stringify(btn2));
};

function displayTask(taskText) {
  let container = document.createElement("div");
  container.classList.add("tazbeet");

  container.innerHTML = `<div class="content">
    <input type="text" placeholder="What do you gonna do ?" class="inpt" value="${taskText}">
    <div> 
      <button class="edit">edit</button> 
      <button class="remove">delete</button>
    </div>
  </div>`;

  document.body.appendChild(container);

  // Attach a click event listener to the "delete" button for this task
  let removeButton = container.querySelector(".remove");
  removeButton.addEventListener("click", () => {
    removeTask(btn2.indexOf(taskText));
    container.remove(); // Remove the task container from the DOM
  });

  let editButton = container.querySelector(".edit");
  editButton.addEventListener("click", () => {
    editTask(container, btn2.indexOf(taskText));
  });
}

function removeTask(index) {
  btn2.splice(index, 1);
  localStorage.added = JSON.stringify(btn2);
}

function editTask(container, index) {
  // Get the input field in the container
  let inputField = container.querySelector(".inpt");

  // Enable the input field for editing
  inputField.removeAttribute("readonly");
  inputField.focus();

  // Update the task when the input field loses focus
  inputField.addEventListener("blur", () => {
    btn2[index] = inputField.value;
    localStorage.added = JSON.stringify(btn2);
    inputField.setAttribute("readonly", true);
  });
}

btn.addEventListener("click", addTask);
window.localStorage.setItem("rr", "ffff");
