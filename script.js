// script.js

// Retrieve tasks from Local Storage or set an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span contenteditable="true" onblur="updateTask(${index}, this.innerText)">${task}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to Local Storage
}

// Add a new task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText) {
    tasks.push(taskText); // Add task to array
    taskInput.value = ""; // Clear input field
    renderTasks();
  } else {
    alert("Please enter a task.");
  }
}

// Update a task
function updateTask(index, newText) {
  if (newText.trim()) {
    tasks[index] = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update Local Storage
  } else {
    alert("Task cannot be empty.");
    renderTasks(); // Re-render tasks to reset the text
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  renderTasks();
}

// Initialize the app by rendering tasks
renderTasks();
