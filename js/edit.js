import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();

const params = new URLSearchParams(window.location.search);
const taskId = params.get('id');
const task = taskManager.getTaskById(taskId);

const form = document.getElementById("edit-task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const backBtn = document.getElementById("back-btn");

if (!task) {
    document.body.innerHTML = "<h1>404 - Task Not Found</h1>";
} else {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    task.title = titleInput.value;
    task.description = descriptionInput.value;
    taskManager.saveToLocalStorage();
    window.location.href = "index.html";
});

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});