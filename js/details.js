import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

const task = taskManager.getTaskById(taskId);

if (!task) {
    render404();
} else {
    document.getElementById("task-title").textContent = task.title;
    document.getElementById("task-description").textContent = task.description;
    document.getElementById("task-status").textContent = task.isCompleted ? "Completed" : "Incomplete";
}

function render404() {
    document.body.innerHTML = `
        <h1>404</h1>
        <p>Task not found.</p>
        <a href="index.html">Go back to the main page</a>
    `;
}