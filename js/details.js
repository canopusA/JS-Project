import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();


document.addEventListener('DOMContentLoaded', () => {
    const taskTitleElement = document.getElementById('task-title');
    const taskDescriptionElement = document.getElementById('task-description');
    const taskStatusElement = document.getElementById('task-status');
    const taskCreationDateElement = document.getElementById('task-creation-date');
    const backBtn = document.getElementById('back-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    if (taskId) {
        const task = taskManager.getTaskById(taskId);

        if (task) {
            taskTitleElement.textContent = task.title;
            taskDescriptionElement.textContent = task.description;
            taskStatusElement.textContent = task.isCompleted ? 'Completed' : 'Incomplete';
            taskCreationDateElement.textContent = task.creationDate;
        } else {
            console.error('Task not found');
            render404();
            taskTitleElement.textContent = 'Task not found';
        }
    } else {
        console.error('No task ID found in the URL');
        taskTitleElement.textContent = 'No task ID specified';
    }

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});


function render404() {
    document.body.innerHTML = `
        <h1>404</h1>
        <p>Task not found.</p>
        <a href="index.html">Go back to the main page</a>
    `;
}