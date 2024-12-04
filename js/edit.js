import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();

taskManager.loadFromLocalStorage();


const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

console.log("Task ID from URL:", taskId);
console.log("Loaded tasks:", taskManager.tasks);

const task = taskManager.getTaskById(taskId);

if (!task) {
    console.error("Task not found!");
    document.body.innerHTML = "<h1>404 - Task Not Found</h1>";
} else {
    console.log("Found task:", task);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;

    document.getElementById("edit-task-form").addEventListener("submit", (event) => {
        event.preventDefault();
        task.title = document.getElementById("title").value.trim();
        task.description = document.getElementById("description").value.trim();
        taskManager.saveToLocalStorage();
        alert("Task updated successfully!");
        window.location.href = "index.html";
    });
}

document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
       



